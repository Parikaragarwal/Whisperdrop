"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const categories = [
  "FAMILY",
  "BUSINESS",
  "SOCIAL",
  "RELATIONSHIP",
  "ACADEMIC",
  "FINANCIAL",
  "SCIENTIFIC",
  "MOVIES",
  "ENTERTAINMENT",
]

export default function AskPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)
  
  // Updated state to handle different message types
  const [message, setMessage] = useState<{ text: string; type: "error" | "helpful" } | null>(null);

  // Redirect unauthenticated users (No changes here)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/signin")
    } else if (status === "authenticated" && !session?.user?.username) {
      router.push("/onboarding")
    }
  }, [status, session, router])

  if (status === "loading") return <p>Loading...</p>

  // Updated handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Use the new state setter

    if (!content.trim()) {
      setMessage({ text: "Question cannot be empty", type: "error" });
      return;
    }
    if (!category) {
      setMessage({ text: "Please select a category", type: "error" });
      return;
    }

    setLoading(true);
    try {
      // Point to the correct API route: /api/ask
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, category }),
      });

      if (!res.ok) {
        const errData = await res.json();
        // Check for our special helpful message flag from the API
        if (errData.isHelpfulMessage) {
          setMessage({ text: errData.error, type: "helpful" });
        } else {
          setMessage({ text: errData.error || "Failed to post question", type: "error" });
        }
        setLoading(false);
        return;
      }

      // On success, clear the form and redirect
      setContent("");
      setCategory("");
      router.push("/questions");
    } catch (err) {
      console.error(err);
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <section className="w-full max-w-3xl text-amber-50">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-amber-300 text-balance">
            Every question deserves an answer.
          </h1>
          <p className="mt-2 text-stone-300">File your curiosity into the archive and let knowledge meet intention.</p>
        </header>

        {/* Updated JSX to display different message types */}
        {message && (
          <div className="mb-6 p-4 rounded-md border text-balance">
            {message.type === 'error' ? (
              // For standard errors, use the red "danger" style
              <div className="border-red-700/40 bg-red-900/30 text-red-200">
                {message.text}
              </div>
            ) : (
              // For the helpful message, use a calmer, more supportive blue style
              <div className="border-blue-600/40 bg-blue-950/30 text-blue-200">
                <p className="font-semibold mb-2">A message of support for you:</p>
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="max-w-2xl mx-auto">
            <label className="sr-only">Category</label>
            <select
              className="w-full rounded-md border border-stone-700 bg-stone-900/60 p-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="max-w-2xl mx-auto">
            <label className="sr-only">Question</label>
            <input
              type="text"
              className="w-full h-14 rounded-full border border-amber-800/40 bg-stone-950/60 px-6 text-center text-amber-50 placeholder-stone-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your question..."
            />
            <p className="mt-2 font-bold  text-blue-950 text-center">
              Tip: Be specific. Good questions find good answers.
            </p>
          </div>

          <div className="flex items-center justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md bg-amber-600 px-5 py-2.5 text-sm font-semibold text-stone-950 hover:bg-amber-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {loading ? "Submitting..." : "Submit Question"}
            </button>
          </div>
        </form>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-amber-800/30 bg-stone-950/50 p-4">
            <p className="text-sm text-stone-200">“Curiosity is the wick in the candle of learning.”</p>
            <p className="mt-2 text-xs text-stone-400">Ask what others overlook.</p>
          </div>
          <div className="rounded-lg border border-amber-800/30 bg-stone-950/50 p-4">
            <p className="text-sm text-stone-200">“Every question is a map to an answer.”</p>
            <p className="mt-2 text-xs text-stone-400">Define your destination clearly.</p>
          </div>
          <div className="rounded-lg border border-amber-800/30 bg-stone-950/50 p-4">
            <p className="text-sm text-stone-200">“The archive rewards the precise.”</p>
            <p className="mt-2 text-xs text-stone-400">Add context. Add intent.</p>
          </div>
        </div>
      </section>
    </div>
  )
}