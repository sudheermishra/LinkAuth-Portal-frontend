"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, clearUser } from "../store/authSlice";

export default function UserSection() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(clearUser());
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950">
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-full border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-medium text-gray-100 hover:bg-gray-800 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 transition"
        >
          Log in
        </Link>
      </main>
    );
  }

  const { name, email, picture } = user;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          {picture ? (
            <img
              src={picture}
              alt=""
              width={72}
              height={72}
              className="rounded-full border-2 border-gray-700"
            />
          ) : (
            <div className="w-[72px] h-[72px] rounded-full bg-gray-700 flex items-center justify-center text-2xl font-semibold text-gray-300">
              {name?.charAt(0) || "?"}
            </div>
          )}
          <h2 className="mt-4 text-lg font-semibold text-gray-100">{name}</h2>
          {email && (
            <p className="mt-0.5 text-sm text-gray-400">{email}</p>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full cursor-pointer rounded-full border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:border-gray-600 focus:outline-none transition"
          >
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}
