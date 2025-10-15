
//whisperdrop-2/src/app/api/uniqueusername/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request)
{
    try {
        const {searchParams}=new URL(req.url);
        const username= searchParams.get("username");

        if(!username) 
        {
            return NextResponse.json(
                {error:"Usernaame is required"},
                {status:400}
            )
        }

        const user = await prisma.user.findUnique({
            where:{username},
        })

        return NextResponse.json({
            available: !user,
        })

    } catch (err) {
        console.error("Check username error:", err);
    return NextResponse.json(
    { error: "Something went wrong" },
    { status: 500 }
    );
    }
}