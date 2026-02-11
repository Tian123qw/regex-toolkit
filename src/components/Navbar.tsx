"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="text-xl">🔍</span>
          <span>Regex<span className="text-purple-400">Toolkit</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/tester" className="text-sm text-gray-400 hover:text-white transition-colors">Tester</Link>
          <Link href="/cheatsheet" className="text-sm text-gray-400 hover:text-white transition-colors">Cheatsheet</Link>
          <Link href="/patterns" className="text-sm text-gray-400 hover:text-white transition-colors">Patterns</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-400 hover:text-white" aria-label="Toggle menu">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-800 bg-gray-900 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/tester" onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white">Tester</Link>
            <Link href="/cheatsheet" onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white">Cheatsheet</Link>
            <Link href="/patterns" onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white">Patterns</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
