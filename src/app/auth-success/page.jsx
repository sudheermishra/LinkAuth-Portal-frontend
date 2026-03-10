"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useMemo(() => {
    const userParam = searchParams.get("user");
    if (!userParam) return null;
    try {
      return JSON.parse(decodeURIComponent(userParam));
    } catch {
      return null;
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) return;
    const t = setTimeout(() => router.replace("/"), 2000);
    return () => clearTimeout(t);
  }, [user, router]);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="w-full max-w-sm bg-gray-900 border border-gray-800 text-center shadow-sm rounded-2xl p-8">
          <h1 className="text-xl font-semibold text-gray-100">No user data</h1>
          <p className="mt-2 text-sm text-gray-400">
            You may have landed here without completing sign in.
          </p>
          <a
            href="/login"
            className="mt-6 inline-block text-sm font-medium text-[#0A66C2] hover:underline"
          >
            Go to login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <p className="text-sm text-gray-500">Redirecting…</p>
    </main>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gray-950">
          <p className="text-gray-400">Loading…</p>
        </main>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
