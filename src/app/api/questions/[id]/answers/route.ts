import { authOptions } from './../../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
// app/api/questions/[id]/answers/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { runGemini } from '../../../../../../lib/gemini';


export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  // check ownership
  const question = await prisma.question.findUnique({
    where: { id: params.id },
    select: { userId: true },
  });

  if (!question || question.userId !== session.user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const answers = await prisma.answer.findMany({
      where: { questionId: params.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(answers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
  }
}


export async function POST(req: Request, { params }: { params: { id: string } }) {
try {
    const { content } = await req.json();

    if (!content || content.trim().length === 0) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

      const moderationPrompt = `
      You are a content moderator for a Q&A website. Analyze the following user-submitted answer.
      Policy Violations:
      - Promotes illegal or dangerous acts.
      - Contains explicit sexual content not for genuine health inquiry.
      - Constitutes hate speech or harassment.
      - Promotes self-harm.

      If the text is safe, respond ONLY with the word: SAFE.
      If the text violates a policy, respond with the word UNSAFE, a colon, and a brief, user-friendly explanation.
      For example: UNSAFE: This content promotes dangerous activities.

      Here is the text to analyze:
      "${content}"
    `;

    const moderationResult = await runGemini(moderationPrompt);

    if (moderationResult.includes('UNSAFE')) {
      const reason = moderationResult.split(':')[1]?.trim() || 'Content violates our safety policy.';
      return new NextResponse(reason, { status: 400 });
    }

    const answer = await prisma.answer.create({
        data: {
        content,
        questionId: params.id,
        },
    });

    return NextResponse.json(answer, { status: 201 });
} catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create answer" }, { status: 500 });
}
}
