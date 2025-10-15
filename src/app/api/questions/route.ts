import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '../../../../lib/prisma';
import { Category, Prisma } from "@prisma/client";
import { runGemini } from '../../../../lib/gemini';
///home/parikar/Projects/whisperdrop-2/src/app/api/questions/route.ts
export async function POST(req: Request)
{
    const session =await getServerSession(authOptions);
    if(!session) return new Response(JSON.stringify({
        error:"Not Authenticated",
        status:401
    }));

    const body = await req.json();
    const {content,category}= body;

    if(!content || content.trim()==="")
    {
        return new Response(JSON.stringify({
            error:"Question cannot be empty",
            status:400
        }));
    }
    if(!category)
    {
        return new Response(JSON.stringify({
            error:"Category needs to be specified",
            status:400
        }));
    }
    

    try {
    // --- 1. AI MODERATION ---
    const moderationPrompt = `
      Classify the following text into one of three categories: SAFE, UNSAFE, or SELF_HARM.

      - A text is SAFE if it is an inquisitive question.
      - A text is UNSAFE if it contains obscene sexual or intimate questions, hate speech, promotes violence, or asks for instructions on dangerous activities.
      - A text is SELF_HARM if it mentions suicide, self-injury, or feelings of hopelessness suggesting a user is in crisis.

      Respond ONLY with the category. If UNSAFE, provide a brief reason after a colon.
      Text: "${content}"
    `;

    const moderationResult = await runGemini(moderationPrompt);

    // --- 2. HANDLE MODERATION RESULTS ---
    if (moderationResult.startsWith('SELF_HARM')) {
      // --- New: Dynamically generate the empathetic response ---
      const empatheticPrompt = `
        The user has posted content that suggests they are in emotional distress or considering self-harm.
        Your task is to generate a short, empathetic, and supportive response.
        - Do NOT give medical advice.
        - Acknowledge their pain gently.
        - Emphasize that help is available and they are not alone.
        - Crucially, include the following helpline information for India: Vandrevala Foundation at 1860-266-2345 or Aasra at +91-9820466726.
        - Keep the entire message concise and kind.
      `;
      const empatheticResponse = await runGemini(empatheticPrompt);
      return Response.json({ error: empatheticResponse, isHelpfulMessage: true }, { status: 422 });
    }

    if (moderationResult.startsWith('UNSAFE')) {
      const reason = moderationResult.split(':')[1]?.trim() || 'Content violates our safety policy.';
      return Response.json({ error: reason }, { status: 400 });
    }

    // --- 3. IF SAFE, CREATE QUESTION AND AI ANSWER ---
    const newQuestion = await prisma.question.create({
      data: {
        content,
        category,
        userId: session.user.id,
      },
    });

    const answerGenerationPrompt = `Answer the following question concisely: "${content}"`;
    const aiAnswerText = await runGemini(answerGenerationPrompt);

    // Save the AI's answer as a normal answer, per your request.
    await prisma.answer.create({
      data: {
        content: aiAnswerText,
        questionId: newQuestion.id,
      },
    });

    return Response.json(newQuestion, { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/ask:", error);
    return Response.json({ error: 'Failed to process request' }, { status: 500 });
  }
}


export async function GET(req: Request) {
  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const search = url.searchParams.get("search") || "";

  try {
    // ✅ Find enums that partially match the search
    const matchingEnums = search
      ? Object.values(Category).filter((c) =>
          c.toLowerCase().includes(search.toLowerCase())
        )
      : [];

    // ✅ Build OR conditions safely
    const OR: Prisma.QuestionWhereInput[] = [];
    if (search) {
      OR.push({ content: { contains: search, mode: "insensitive" } });
      if (matchingEnums.length > 0) {
        OR.push({ category: { in: matchingEnums } });
      }
    }

    const questions = await prisma.question.findMany({
      where: OR.length > 0 ? { OR } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: { user: { select: { username: true } } },
    });

    return new Response(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch questions" }),
      { status: 500 }
    );
  }
}




