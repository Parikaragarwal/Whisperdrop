//src/app/api/update-username/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { username } = body;
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Check if username is taken by another user
    const exists = await prisma.user.findFirst({
      where: { username, NOT: { id: session.user.id } },
    });
    if (exists) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { username },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
