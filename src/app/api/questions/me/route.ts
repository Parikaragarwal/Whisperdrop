import { getServerSession } from 'next-auth/next';
import prisma from '../../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';
// GET /api/questions/me
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req:Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: "Not Authenticated" }), { status: 401 });

  const questions = await prisma.question.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(questions), { status: 200 });
}
