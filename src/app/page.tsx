import Link from "next/link";
import Footer from "@/components/Footer";

const features = [
  {
    href: "/tester",
    icon: "🔍",
    name: "Regex Tester",
    desc: "Test your regular expressions in real-time with instant matching and highlighting.",
  },
  {
    href: "/cheatsheet",
    icon: "📖",
    name: "Cheatsheet",
    desc: "Quick reference for regex syntax, metacharacters, and quantifiers.",
  },
  {
    href: "/patterns",
    icon: "📋",
    name: "Common Patterns",
    desc: "Ready-to-use regex patterns for email, phone, URL, and more.",
  },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />
          <div className="absolute right-1/3 top-8 h-64 w-64 rounded-full bg-pink-500/8 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pt-16 pb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Free Online{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Regex Tester
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Test, debug, and learn regular expressions. Simple, fast, no sign-up required.
          </p>
          <div className="mt-8">
            <Link
              href="/tester"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-500"
            >
              Start Testing
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-4 pb-12 flex-1 flex items-start">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-purple-500/40 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-0.5"
            >
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h2 className="mb-1.5 text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                {f.name}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
