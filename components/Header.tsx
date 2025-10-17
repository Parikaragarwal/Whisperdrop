"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Header() {
  useEffect(() => {
    async function enhanceAuthUI() {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        if (data && Object.keys(data).length) {
          showDashboardLink();
          setupLogoutButton();
        }
      } catch {
        // ignore errors silently
      }
    }

    function showDashboardLink() {
      const dash = document.getElementById("dashboard-link");
      if (dash) dash.classList.remove("hidden");
    }

const setupLogoutButton = () => {
  const btn = document.getElementById("auth-button");
  if (!btn) return;

  btn.textContent = "Logout";
  btn.setAttribute("href", "#");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut({ callbackUrl: "/api/signin" }); // ✅ clears session and redirects
  });
};

    if (document.readyState === "complete" || document.readyState === "interactive") {
      enhanceAuthUI();
    } else {
      document.addEventListener("DOMContentLoaded", enhanceAuthUI, { once: true });
    }
  }, []);

  return (
    <header className="w-full border-b border-amber-800/40 bg-stone-950/70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Project name */}
          <Link
            href="/"
            className="text-xl font-bold tracking-wide text-amber-200 hover:text-amber-300 transition"
            aria-label="Whisperdrop Home"
          >
            Whisperdrop
          </Link>

          {/* Right: Nav */}
          <nav className="flex items-center gap-6 text-stone-300">
            <Link href="/questions" className="hover:text-amber-300 transition">
              Questions
            </Link>
            <Link href="/donations" className="hover:text-amber-300 transition">
              Donations
            </Link>
            <Link href="/about" className="hover:text-amber-300 transition">
              About
            </Link>
            {/* Hidden by default; shown if session exists */}
            <Link
              id="dashboard-link"
              href="/dashboard"
              className="hover:text-amber-300 transition hidden"
            >
              Dashboard
            </Link>
            {/* Auth button: defaults to Sign Up, becomes Logout if session exists */}
            <Link
              id="auth-button"
              href="/signin"
              className="ml-2 inline-flex items-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
