"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Main Container */}
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          {/* Decorative Icon */}
          <div className="inline-block p-4 bg-amber-50/40 border-2 border-amber-900/30 rounded-full shadow-md">
            <svg className="w-16 h-16 text-amber-900/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.94-7-5.05-7-9V8.3l7-3.11v14.82z"/>
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-serif tracking-wide text-amber-950">
              Enter the Archive
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-amber-900/30"></div>
              <span className="text-amber-900/60 text-xl">✦</span>
              <div className="h-px w-12 bg-amber-900/30"></div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-base font-bold bg-amber-100 rounded-3xl border-4 p-4 border-amber-900 text-amber-900/70 italic max-w-sm mx-auto">
            Authenticate your identity to access the sacred collection of knowledge
          </p>
        </div>

        {/* Sign In Card */}
        <div className="relative p-8 bg-amber-50/30 border-2 border-amber-900/20 rounded-lg shadow-lg">
          {/* Corner Decorations */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-900/30"></div>
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-900/30"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-900/30"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-900/30"></div>

          <div className="space-y-4">
            {/* Section Title */}
            <div className="text-center pb-4 border-b border-amber-900/20">
              <h2 className="text-lg font-serif font-semibold text-amber-950">
                Choose Your Seal
              </h2>
              <p className="text-l font-bold text-amber-900/60 italic mt-1">
                Authenticate with your trusted authority
              </p>
            </div>

            {/* GitHub Button */}
            <button
              onClick={() => {
                signIn("github", { callbackUrl: "/dashboard" });
              }}
              className="w-full group relative px-6 py-4 bg-amber-950 text-amber-50 rounded-lg border-2 border-amber-950 font-serif font-semibold hover:bg-amber-900 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Continue with GitHub</span>
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-amber-900/20"></div>
              <span className="text-xl font-serif text-amber-900/50 italic">or</span>
              <div className="h-px flex-1 bg-amber-900/20"></div>
            </div>

            {/* Google Button */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full group relative px-6 py-4 bg-white text-amber-950 rounded-lg border-2 border-amber-900/30 font-serif font-semibold hover:bg-amber-50/50 hover:border-amber-900/50 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-amber-900/50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-serif text-amber-900/60 italic">
              Your credentials remain secure and encrypted
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="h-px w-16 bg-amber-900/20"></div>
            <svg className="w-4 h-4 text-amber-900/40" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
            </svg>
            <div className="h-px w-16 bg-amber-900/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}