import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '../../../../../lib/prisma';

export async function GET(req: Request,{ params }: { params: { id: string } })
{
    const id = params.id;

    if(!id){
        return new Response(JSON.stringify({
            error:"Question id expected",
            status:400
        }))
    }
    try {
        const question = await prisma.question.findUnique(
        {
            where: {id}
        });
        if(!question)
        {
            return new Response(JSON.stringify({
            error:"Error finding Question",
            status:404}));
        }
        else
        {
            return new Response(JSON.stringify(question), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            error:"Error finding Question",
            status:500
        }))
    }
}

export async function PATCH(req: Request,{ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session)
    return new Response(JSON.stringify({ error: "Not Authenticated" }), { status: 401 });

    const body = await req.json();
    const id = params.id;
    const { content, category } = body;

    if (!id) return new Response(JSON.stringify({ error: "Question ID is required" }), { status: 400 });

    try {
    // Only the owner can update
    const question = await prisma.question.update({
        where: { id },
        data: { content, category },
    });
    if(!question)
    {
        return new Response(JSON.stringify({
            error:"Question with given id not found",
            status:404
        }))
    }

    return new Response(JSON.stringify(question), { status: 200 });
} catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update question" }), { status: 500 });
}
}

// app/api/questions/[id]/route.ts (DELETE part)
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
    await prisma.question.delete({
        where: { id: params.id },
    });

    return new Response(JSON.stringify({ message: "Question and its answers deleted" }));
    } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete question" ,status:500}));
    }
}


