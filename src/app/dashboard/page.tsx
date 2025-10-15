"use client"

import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

type Question = {
  id: string
  content: string
  category: string
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()

  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Fetch user's questions
  useEffect(() => {
    if (status !== "authenticated") return
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions/me")
        if (!res.ok) throw new Error("Failed to fetch questions")
        const data: Question[] = await res.json()
        setQuestions(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [status])

  // Delete a question
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/questions/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete question")
      setQuestions((prev) => prev.filter((q) => q.id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  // Update a question
  const handleUpdate = async (q: Question) => {
    const newContent = prompt("Enter updated question:", q.content)
    if (!newContent || newContent.trim() === "") return
    setUpdatingId(q.id)
    try {
      const res = await fetch(`/api/questions/${q.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent, category: q.category }),
      })
      if (!res.ok) throw new Error("Failed to update question")
      setQuestions((prev) => prev.map((item) => (item.id === q.id ? { ...item, content: newContent } : item)))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-amber-900/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 animate-spin"></div>
          </div>
          <p className="text-amber-200 text-lg font-light">Preparing your archive...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-stone-900/60 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-12">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-amber-200 text-xl">Please sign in to access your dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 px-4">
        <section className="text-center w-full">
          <h2
        className="text-3xl md:text-4xl font-old font-bold text-[#5e2c04] text-center text-balance font-[Cinzel_Decorative]"
      >
        Step into Your Archive
      </h2>
      <p className="text-[#4b3a29] max-w-2xl mx-auto mt-4 leading-relaxed font-old text-lg tracking-wide">
        Uncover the secrets of the world
      </p>
          <div className="mt-6">
            <Link
              href="/ask"
              className="inline-block bg-red-800  hover:bg-amber-800 text-stone-100 font-bold px-10 py-4 rounded-xl text-lg shadow-[0_10px_25px_-10px_rgba(245,158,11,0.6)] transition-transform hover:scale-105"
            >
              Ask Your Next Question
            </Link>
          </div>
          <p className=" text-blue-950 text-3xl font-bold max-w-md mx-auto mt-3"> Your voice matters.</p>
        </section>

        <section className="bg-stone-900/60 backdrop-blur-sm p-6 rounded-2xl border border-stone-700 shadow-xl w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-amber-200 font-semibold text-lg">{session.user.username || "Curious Mind"}</p>
            <p className="text-stone-300 text-sm">{session.user.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="self-start md:self-auto bg-stone-800 hover:bg-stone-700 text-stone-100 px-5 py-2.5 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </section>

        <section className="w-full">
          <h3 className="text-2xl font-bold text-amber-200 mb-6 flex items-center gap-2">
            <span>📜</span>
            Your Archive
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-5xl mb-4">📚</div>
                <p className="text-stone-300 text-lg">No entries yet.</p>
                <p className="text-stone-400 text-sm mt-2">Begin your collection with your first question.</p>
              </div>
            ) : (
              questions.map((q) => (
                <div
                  key={q.id}
                  className="bg-stone-900/60 backdrop-blur-sm p-6 rounded-2xl border border-stone-700 shadow-lg hover:shadow-amber-900/30 hover:border-amber-700 transition flex flex-col group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-amber-700 text-stone-50 px-3 py-1 rounded-full text-xs font-semibold">
                      {q.category}
                    </span>
                    <span className="text-stone-400 text-xs">{new Date(q.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Link
                    href={`/questions/${q.id}`}
                    className="mb-4 text-base text-stone-100 hover:text-amber-200 transition leading-relaxed"
                  >
                    {q.content}
                  </Link>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleUpdate(q)}
                      disabled={updatingId === q.id}
                      className="flex-1 bg-amber-700 hover:bg-amber-800 text-stone-100 px-3 py-2 rounded-lg font-semibold disabled:opacity-50 transition text-sm"
                    >
                      {updatingId === q.id ? "Updating..." : "✏️ Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      disabled={deletingId === q.id}
                      className="flex-1 bg-red-700 hover:bg-red-800 text-stone-100 px-3 py-2 rounded-lg font-semibold disabled:opacity-50 transition text-sm"
                    >
                      {deletingId === q.id ? "Deleting..." : "🗑️ Delete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
