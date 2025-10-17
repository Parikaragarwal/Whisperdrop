// /home/parikar/Projects/whisperdrop-2/components/AnswerForm.tsx
"use client";
import { useState } from "react";

type Props = {
  questionId: string;
};

export default function AnswerForm({ questionId }: Props) {
  const [content, setContent] = useState("");
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/questions/${questionId}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to submit answer");
      }
      const data = await res.json();
      setSubmittedAnswers((prev) => [data.content, ...prev]);
      setContent("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="relative p-6 bg-amber-50/30 border-2 border-amber-900/20 rounded-lg shadow-md">
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-900/30"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-900/30"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-amber-900/20">
            <svg className="w-5 h-5 text-amber-900/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              <path d="M8 15h8v2H8zm0-4h8v2H8zm0-4h5v2H8z"/>
            </svg>
            <h3 className="text-lg font-serif font-semibold text-amber-950">Inscribe Your Response</h3>
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your knowledge and wisdom..."
            className="w-full px-4 py-3 bg-amber-100/40 border-2 border-amber-900/20 rounded-lg text-amber-950 placeholder-amber-900/40 focus:outline-none focus:border-amber-900/40 focus:bg-amber-50/60 transition-all font-serif shadow-inner resize-none"
            rows={6}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3.5 bg-amber-900/80 text-amber-50 rounded-lg border-2 border-amber-950/30 font-serif font-semibold hover:bg-amber-900 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Inscribing wisdom...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Submit Response</span>
              </>
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border-2 border-red-300/50 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-serif text-red-800">{error}</p>
          </div>
        )}
      </div>

      {/* Display submitted answers locally */}
      {submittedAnswers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-2">
            <div className="h-px flex-1 bg-amber-900/20"></div>
            <span className="text-sm font-serif text-amber-900/60 italic">Your Inscribed Responses</span>
            <div className="h-px flex-1 bg-amber-900/20"></div>
          </div>

          {submittedAnswers.map((ans, idx) => (
            <div
              key={idx}
              className="relative p-5 bg-amber-50/40 border-2 border-amber-900/20 rounded-lg shadow-sm"
            >
              {/* New Badge */}
              <div className="absolute -top-3 left-4 px-3 py-1 bg-amber-900/80 text-amber-50 rounded-full border-2 border-amber-950/30 shadow-sm">
                <span className="text-xs font-serif font-semibold">Newly Inscribed</span>
              </div>

              <p className="text-base font-serif text-amber-950 leading-relaxed pt-2">
                {ans}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}