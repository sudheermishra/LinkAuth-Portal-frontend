"use client";

import { useState } from "react";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001").replace(/\/$/, "").trim();
const LINKEDIN_AUTH_URL = `${BACKEND_URL}/auth/linkedin`;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    window.location.href = LINKEDIN_AUTH_URL;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 text-center shadow-sm rounded-2xl p-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-100">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-400">
            Sign in with your LinkedIn account to continue.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-900 transition disabled:opacity-70 disabled:cursor-wait"
        >
          {loading ? (
            <>
              <span>Signing in…</span>
            </>
          ) : (
            <>
              <span className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#0A66C2] text-[10px] font-bold text-white">
                in
              </span>
              <span>Continue with LinkedIn</span>
            </>
          )}
        </button>
      </div>
    </main>
  );
}