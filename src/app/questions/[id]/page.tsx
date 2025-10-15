import AnswerList from "../../../../components/AnswerList";
import AnswerForm from "../../../../components/AnswerForm";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type QuestionPageProps = {
  params: { id: string };
};

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { id } = await params;
  
  // fetch question
  const question = await prisma.question.findUnique({
    where: { id },
  });

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto border-4 border-amber-900/30 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-900/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-2xl font-serif text-amber-950">Scroll Not Found</p>
          <p className="text-amber-900/60 font-serif italic">This entry has been lost to the ages</p>
        </div>
      </div>
    );
  }

  // fetch session
  const session = await getServerSession(authOptions);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let answers: any = [];
  const isOwner = session?.user?.id === question.userId;

  if (isOwner) {
    // fetch answers only if owner
    answers = await prisma.answer.findMany({
      where: { questionId: id },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Decorative Header */}
      <div className="text-center space-y-3 pb-6 border-b-2 border-amber-900/20">
        <div className="inline-block">
          <svg className="w-12 h-12 text-amber-900/70 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.94-7-5.05-7-9V8.3l7-3.11v14.82z"/>
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>
        <h1 className="text-3xl font-serif text-amber-950 tracking-wide">Inquiry Chronicle</h1>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-amber-900/30"></div>
          <span className="text-amber-900/60 text-xl">✦</span>
          <div className="h-px w-16 bg-amber-900/30"></div>
        </div>
      </div>

      {/* Question Display */}
      <div className="relative p-8 bg-amber-50/30 border-2 border-amber-900/20 rounded-lg shadow-md">
        {/* Corner Decorations */}
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-900/30"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-900/30"></div>
        
        {/* Category Badge */}
        <div className="inline-block px-4 py-1.5 bg-amber-900/10 border border-amber-900/30 rounded-full mb-4">
          <span className="text-xs font-serif font-semibold text-amber-950 uppercase tracking-wider">
            {question.category}
          </span>
        </div>

        {/* Question Content */}
        <div className="space-y-4">
          <p className="text-lg font-serif text-amber-950 leading-relaxed">
            {question.content}
          </p>
          
          <div className="pt-4 border-t border-amber-900/10">
            <p className="text-sm font-serif text-amber-900/60 italic">
              Inscribed on {new Date(question.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="h-px w-full bg-amber-900/20"></div>
        <span className="text-amber-900/60 font-serif italic text-sm whitespace-nowrap">
          {isOwner ? "Collected Wisdom" : "Share Your Wisdom"}
        </span>
        <div className="h-px w-full bg-amber-900/20"></div>
      </div>

      {/* Conditional Rendering */}
      {isOwner ? (
        <AnswerList answers={answers} />
      ) : (
        <AnswerForm questionId={id} />
      )}
    </div>
  );
}