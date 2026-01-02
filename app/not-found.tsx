"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 px-6">
      <div className="text-center max-w-lg">
        
        {/* Big 404 */}
        <h1 className="text-7xl font-bold text-blue-600">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          Oops! Looks like the page you’re looking for doesn’t exist.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="px-10 py-2 border border-gray-400 text-gray-700 hover:bg-gray-100 rounded transition"
          >
            Back
          </button>

          {/* Home */}
          <Link
            href="/"
            className="px-10 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
             Home
          </Link>
        </div>

      </div>
    </div>
  );
}
