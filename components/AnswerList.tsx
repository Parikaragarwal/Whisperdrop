"use client";

type Answer = {
  id: string;
  content: string;
  createdAt: string;
};

export default function AnswerList({ answers }: { answers: Answer[] }) {
  if (answers.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-24 h-24 mx-auto border-4 border-amber-900/20 rounded-full flex items-center justify-center bg-amber-50/30">
          <svg className="w-12 h-12 text-amber-900/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-serif text-amber-950">No Responses Yet</p>
          <p className="text-sm font-serif text-amber-900/60 italic">
            The archive awaits the wisdom of scholars
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-amber-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-900/10 border-2 border-amber-900/30 rounded-full flex items-center justify-center">
            <span className="text-lg font-serif font-bold text-amber-950">{answers.length}</span>
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold text-amber-950">
              Collected Responses
            </h2>
            <p className="text-xs font-serif text-amber-900/60 italic">
              {answers.length === 1 ? "One voice of wisdom" : `${answers.length} voices of wisdom`}
            </p>
          </div>
        </div>
      </div>

      {/* Answers List */}
      <div className="space-y-5">
        {answers.map((a, index) => (
          <div
            key={a.id}
            className="relative p-6 bg-amber-50/30 border-2 border-amber-900/20 rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50/50 transition-all duration-300"
          >
            {/* Corner Decorations */}
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-amber-900/30"></div>
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-amber-900/30"></div>

            {/* Entry Number */}
            <div className="absolute -left-4 top-6 w-10 h-10 bg-amber-900/80 border-2 border-amber-950/30 rounded-full flex items-center justify-center shadow-md">
              <span className="text-sm font-serif font-bold text-amber-50">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Content */}
            <div className="pl-4 space-y-4">
              <p className="text-base font-serif text-amber-950 leading-relaxed">
                {a.content}
              </p>

              {/* Metadata Footer */}
              <div className="flex items-center gap-2 pt-3 border-t border-amber-900/10">
                <svg className="w-4 h-4 text-amber-900/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-serif text-amber-900/60 italic">
                  Inscribed on {new Date(a.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} at {new Date(a.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* End Seal */}
      <div className="flex items-center justify-center pt-6">
        <div className="flex items-center gap-3 text-amber-900/50">
          <div className="h-px w-20 bg-amber-900/20"></div>
          <div className="w-8 h-8 border-2 border-amber-900/30 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="h-px w-20 bg-amber-900/20"></div>
        </div>
      </div>
    </div>
  );
}