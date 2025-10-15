"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [username, setUsername] = useState("");
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { update } = useSession();

  // Check username availability
  const checkUsername = async (name: string) => {
    if (!name) {
      setAvailable(null);
      return;
    }
    try {
      const res = await fetch(`/api/uniqueusername?username=${name}`);
      const data = await res.json();
      setAvailable(data.available);
    } catch (err) {
      console.error(err);
      setAvailable(null);
    }
  };

  // Save username to database
  const saveUsername = async () => {
    if (!username || available === false) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/update-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        await update();
        router.push("/dashboard");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Network error");
    }
  };

  const nextSlide = () => {
    if (currentSlide < 4) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-amber-900/30 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-amber-900/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-amber-900/30 rounded-full"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl relative">
        {/* Slide Container */}
        <div className="relative p-12 bg-amber-50/40 border-4 border-amber-900/20 rounded-lg shadow-2xl min-h-[500px] flex flex-col">
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-900/40"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-900/40"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-900/40"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-900/40"></div>

          {/* Slide 0: Welcome */}
          {currentSlide === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
              <div className="w-24 h-24 bg-amber-900/10 border-4 border-amber-900/30 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-amber-900/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl font-serif font-bold text-amber-950 tracking-wide">
                  Welcome, Seeker
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-amber-900/30"></div>
                  <span className="text-2xl text-amber-900/60">✦</span>
                  <div className="h-px w-20 bg-amber-900/30"></div>
                </div>
                <p className="text-xl font-serif text-amber-900/70 italic max-w-xl">
                  You stand at the threshold of wisdom&apos;s eternal archive
                </p>
              </div>

              <p className="text-lg font-serif text-amber-950/80 leading-relaxed max-w-2xl">
                Before you enter, let us share a truth that has echoed through the ages—a truth that defines our very existence.
              </p>
            </div>
          )}

          {/* Slide 1: What Makes Us Human */}
          {currentSlide === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 bg-amber-900/10 border-4 border-amber-900/30 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-amber-900/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl font-serif font-bold text-amber-950">
                  What Makes Us Human?
                </h2>
                
                <p className="text-xl font-serif text-amber-950/80 leading-relaxed max-w-2xl">
                  Not our strength—for the lion surpasses us.
                  <br />
                  Not our speed—for the cheetah outpaces us.
                  <br />
                  Not our senses—for the eagle sees farther.
                </p>

                <div className="pt-4">
                  <p className="text-2xl font-serif text-amber-900/90 italic font-semibold">
                    It is our ability to ask &quot;Why?&quot;
                  </p>
                </div>
              </div>

              <p className="text-lg font-serif text-amber-950/70 leading-relaxed max-w-2xl italic">
                This singular gift—to question, to wonder, to seek—separates us from every creature that walks, flies, or swims upon this Earth.
              </p>
            </div>
          )}

          {/* Slide 2: The Journey */}
          {currentSlide === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 bg-amber-900/10 border-4 border-amber-900/30 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-amber-900/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl font-serif font-bold text-amber-950">
                  The Eternal Flame
                </h2>
                
                <p className="text-xl font-serif text-amber-950/80 leading-relaxed max-w-2xl">
                  For millennia, humans have gazed at the stars and asked
                  <span className="italic font-semibold"> &quot;What lies beyond?&quot;</span>
                </p>

                <p className="text-xl font-serif text-amber-950/80 leading-relaxed max-w-2xl">
                  We looked at fire and asked
                  <span className="italic font-semibold"> &quot;How can we harness it?&quot;</span>
                </p>

                <p className="text-xl font-serif text-amber-950/80 leading-relaxed max-w-2xl">
                  We studied illness and asked
                  <span className="italic font-semibold"> &quot;How can we heal?&quot;</span>
                </p>
              </div>

              <p className="text-lg font-serif text-amber-900/70 leading-relaxed max-w-2xl italic pt-4">
                Each question sparked a journey. Each answer lit the way for the next generation.
              </p>
            </div>
          )}

          {/* Slide 3: The Torch */}
          {currentSlide === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 bg-amber-900/10 border-4 border-amber-900/30 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-amber-900/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5 2C9.76 2 7.5 4.26 7.5 7c0 1.83 1 3.43 2.49 4.31L11.5 18h2l1.51-6.69C16.5 10.43 17.5 8.83 17.5 7c0-2.74-2.24-5-5-5zm.5 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-2 11h4v2h-4z"/>
                </svg>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl font-serif font-bold text-amber-950">
                  The Torch Is Yours
                </h2>
                
                <p className="text-2xl font-serif text-amber-900/90 leading-relaxed max-w-2xl italic font-semibold">
                  This fire of curiosity must never die out.
                </p>

                <p className="text-xl font-serif text-amber-950/80 leading-relaxed max-w-2xl">
                  Every great discovery began with a question.
                  <br />
                  Every masterpiece started with &quot;What if?&quot;
                  <br />
                  Every revolution sparked from &quot;Why not?&quot;
                </p>
              </div>

              <div className="pt-4 px-8 py-4 bg-amber-900/10 border-2 border-amber-900/30 rounded-lg">
                <p className="text-lg font-serif text-amber-950 leading-relaxed italic">
                  Today, we hand this torch to you—the power to ask, to seek, to inspire others with your questions.
                </p>
              </div>
            </div>
          )}

          {/* Slide 4: Username Selection */}
          {currentSlide === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 bg-amber-900/10 border-4 border-amber-900/30 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-amber-900/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-4xl font-serif font-bold text-amber-950">
                  Inscribe Your Name
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-16 bg-amber-900/30"></div>
                  <span className="text-xl text-amber-900/60">✦</span>
                  <div className="h-px w-16 bg-amber-900/30"></div>
                </div>
                <p className="text-lg font-serif text-amber-900/70 italic max-w-xl">
                  Choose your identity in the Archive of Inquiry
                </p>
              </div>

              <div className="w-full max-w-md space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-serif font-semibold text-amber-950">
                    Your Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      checkUsername(e.target.value);
                    }}
                    placeholder="Enter your chosen name..."
                    className="w-full px-4 py-3 bg-amber-100/40 border-2 border-amber-900/20 rounded-lg text-amber-950 placeholder-amber-900/40 focus:outline-none focus:border-amber-900/40 focus:bg-amber-50/60 transition-all font-serif shadow-inner"
                  />
                </div>

                {/* Availability Messages */}
                {available === false && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border-2 border-red-300/50 rounded-lg">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-serif text-red-800">
                      This name has already been claimed
                    </p>
                  </div>
                )}

                {available === true && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border-2 border-green-300/50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-serif text-green-800">
                      This name is available and awaits you
                    </p>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border-2 border-red-300/50 rounded-lg">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-serif text-red-800">{error}</p>
                  </div>
                )}

                <button
                  onClick={saveUsername}
                  disabled={loading || !username || available === false}
                  className="w-full px-6 py-4 bg-amber-900/80 text-amber-50 rounded-lg border-2 border-amber-950/30 font-serif font-semibold hover:bg-amber-900 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Inscribing your name...</span>
                    </>
                  ) : (
                    <>
                      <span>Enter the Archive</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm font-serif text-amber-900/60 italic text-center max-w-md">
                Once inscribed, your name shall grant you the privilege to pose questions to the archive
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-auto border-t-2 border-amber-900/20">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="px-6 py-2 bg-amber-100/40 text-amber-950 rounded-lg border-2 border-amber-900/20 font-serif font-semibold hover:bg-amber-100/60 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </button>

            {/* Progress Indicators */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    currentSlide === idx
                      ? "bg-amber-900/80 border-amber-950/30 w-8"
                      : "bg-amber-100/40 border-amber-900/30 hover:bg-amber-200/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === 4}
              className="px-6 py-2 bg-amber-900/80 text-amber-50 rounded-lg border-2 border-amber-950/30 font-serif font-semibold hover:bg-amber-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>Next</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}