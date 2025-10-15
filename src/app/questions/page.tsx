"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"

type Question = {
  id: string
  content: string
  category: string
  createdAt: string
  user?: { username: string }
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState("")
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const fetchQuestions = async (searchQuery: string = "", reset: boolean = false) => {
    if (loading || (!hasMore && !reset)) return
    setLoading(true)
    
    const currentCursor = reset ? null : cursor
    const url = `/api/questions?limit=10${currentCursor ? `&cursor=${currentCursor}` : ""}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`
    
    const res = await fetch(url)
    const data: Question[] = await res.json()
    
    if (data.length === 0) {
      setHasMore(false)
      if (reset) setQuestions([])
    } else {
      setQuestions((prev) => reset ? data : [...prev, ...data])
      setCursor(data[data.length - 1].id)
      if (data.length < 10) setHasMore(false)
    }
    setLoading(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    
    debounceTimeout.current = setTimeout(() => {
      setQuestions([])
      setCursor(null)
      setHasMore(true)
      fetchQuestions(value, true)
    }, 500)
  }

  useEffect(() => {
    fetchQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Decorative Header Border */}
        <div className="border-t-4 border-b-4 border-double border-amber-900/40 py-6 mb-12">
          <div className="text-center">
            <div className="inline-block mb-3">
              <svg className="w-12 h-12 text-amber-950/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.28-1.05-7-5.35-7-9.5V8.3l7-3.11 7 3.11V11c0 4.15-2.72 8.45-7 9.5z"/>
                <path d="M10.23 13.69L7.77 11.23 6.36 12.64 10.23 16.5 17.64 9.09 16.23 7.68z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-serif tracking-wide text-amber-950 mb-3" style={{textShadow: '1px 1px 2px rgba(120, 53, 15, 0.1)'}}>
              Archive of Inquiry
            </h1>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16 bg-amber-900/30"></div>
              <svg className="w-4 h-4 text-amber-900/40" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <div className="h-px w-16 bg-amber-900/30"></div>
            </div>
            <p className="text-lg text-amber-950/70 italic font-serif max-w-2xl mx-auto leading-relaxed">
              -Judge a man by his questions rather than by his answers.-
            </p>
            <p className="text-sm text-amber-900/60 mt-1 font-serif">— Voltaire</p>
          </div>
        </div>

        {/* Search Scroll */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-amber-950/5 rounded-lg blur-sm"></div>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search the archives..."
              className="relative w-full px-6 py-4 bg-amber-100/40 border-2 border-amber-900/20 rounded-lg text-amber-950 placeholder-amber-900/40 focus:outline-none focus:border-amber-900/40 focus:bg-amber-50/60 transition-all font-serif shadow-inner"
            />
            <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-900/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Scroll Divider */}
        <div className="mb-10 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-amber-900/20"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 font-bold text-xl text-amber-900/60 bg-amber-200 rounded-3xl font-serif italic">
              Wisdom shared is wisdom multiplied
            </span>
          </div>
        </div>

        {/* Questions Manuscript Style */}
        <div className="space-y-6 mb-10">
          {questions.map((q, index) => (
            <Link key={q.id} href={`/questions/${q.id}`}>
              <div className="group relative p-6 bg-amber-50/30 border-2 border-amber-900/20 rounded shadow-sm hover:shadow-md hover:bg-amber-50/50 transition-all duration-300 hover:-translate-y-0.5">
                {/* Decorative Corner */}
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-900/20 rounded-tr"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-900/20 rounded-bl"></div>
                
                <div className="flex items-start gap-4">
                  {/* Entry Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-900/10 border border-amber-900/20 flex items-center justify-center">
                    <span className="text-sm font-serif font-semibold text-amber-900/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-serif font-medium rounded bg-amber-900/10 text-amber-900 border border-amber-900/20">
                        {q.category}
                      </span>
                    </div>
                    <p className="text-amber-950 font-serif leading-relaxed mb-3 text-lg">
                      {q.content}
                    </p>
                    <div className="flex items-center text-xs text-amber-900/60 font-serif">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Inscribed by {q.user?.username ?? "Anonymous"}
                    </div>
                  </div>

                  <svg className="flex-shrink-0 w-5 h-5 text-amber-900/30 group-hover:text-amber-900/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Loading Seal */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-amber-900/20 border-t-amber-900/60 rounded-full animate-spin mb-4"></div>
            <p className="text-amber-900/70 text-sm font-serif italic">Retrieving ancient knowledge...</p>
          </div>
        )}

        {/* Load More Scroll Button */}
        {hasMore && !loading && (
          <div className="text-center">
            <button
              onClick={() => fetchQuestions(search)}
              className="group px-8 py-3.5 bg-amber-900/80 text-amber-50 rounded border-2 border-amber-950/30 font-serif font-semibold hover:bg-amber-900 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="flex items-center gap-2">
                Unfold More Scrolls
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        )}

        {/* End Seal */}
        {!hasMore && questions.length > 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-amber-900/10 border-2 border-amber-900/20 mb-4">
              <svg className="w-8 h-8 text-amber-900/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-amber-900/70 text-lg font-serif">The archive has been fully explored</p>
            <p className="text-amber-900/50 text-sm mt-2 font-serif italic">Return when new wisdom is inscribed</p>
          </div>
        )}
      </div>
    </div>
  )
}