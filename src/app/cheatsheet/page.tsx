import Footer from "@/components/Footer";
import CopyButton from "@/components/CopyButton";

const sections = [
  {
    title: "Character Classes",
    items: [
      { pattern: ".", desc: "Any character except newline" },
      { pattern: "\\d", desc: "Digit (0-9)" },
      { pattern: "\\D", desc: "Not a digit" },
      { pattern: "\\w", desc: "Word character (a-z, A-Z, 0-9, _)" },
      { pattern: "\\W", desc: "Not a word character" },
      { pattern: "\\s", desc: "Whitespace (space, tab, newline)" },
      { pattern: "\\S", desc: "Not whitespace" },
      { pattern: "[abc]", desc: "Any of a, b, or c" },
      { pattern: "[^abc]", desc: "Not a, b, or c" },
      { pattern: "[a-z]", desc: "Character range a to z" },
    ],
  },
  {
    title: "Anchors",
    items: [
      { pattern: "^", desc: "Start of string (or line with m flag)" },
      { pattern: "$", desc: "End of string (or line with m flag)" },
      { pattern: "\\b", desc: "Word boundary" },
      { pattern: "\\B", desc: "Not a word boundary" },
    ],
  },
  {
    title: "Quantifiers",
    items: [
      { pattern: "*", desc: "0 or more" },
      { pattern: "+", desc: "1 or more" },
      { pattern: "?", desc: "0 or 1 (optional)" },
      { pattern: "{n}", desc: "Exactly n times" },
      { pattern: "{n,}", desc: "n or more times" },
      { pattern: "{n,m}", desc: "Between n and m times" },
      { pattern: "*?", desc: "0 or more (lazy)" },
      { pattern: "+?", desc: "1 or more (lazy)" },
    ],
  },
  {
    title: "Groups & Lookaround",
    items: [
      { pattern: "(abc)", desc: "Capturing group" },
      { pattern: "(?:abc)", desc: "Non-capturing group" },
      { pattern: "(?=abc)", desc: "Positive lookahead" },
      { pattern: "(?!abc)", desc: "Negative lookahead" },
      { pattern: "(?<=abc)", desc: "Positive lookbehind" },
      { pattern: "(?<!abc)", desc: "Negative lookbehind" },
      { pattern: "a|b", desc: "Match a or b" },
    ],
  },
  {
    title: "Flags",
    items: [
      { pattern: "g", desc: "Global - find all matches" },
      { pattern: "i", desc: "Case insensitive" },
      { pattern: "m", desc: "Multiline - ^ and $ match line boundaries" },
      { pattern: "s", desc: "Dotall - . matches newline" },
      { pattern: "u", desc: "Unicode support" },
    ],
  },
  {
    title: "Special Characters",
    items: [
      { pattern: "\\n", desc: "Newline" },
      { pattern: "\\r", desc: "Carriage return" },
      { pattern: "\\t", desc: "Tab" },
      { pattern: "\\0", desc: "Null character" },
      { pattern: "\\\\", desc: "Backslash" },
    ],
  },
];

export default function CheatsheetPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold text-white">Regex Cheatsheet</h1>
        <p className="mb-8 text-gray-400">Quick reference for regular expression syntax</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} className="rounded-xl border border-gray-800 bg-gray-900 p-4">
              <h2 className="mb-3 text-lg font-semibold text-purple-400">{section.title}</h2>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.pattern} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <code className="rounded bg-gray-800 px-2 py-0.5 font-mono text-sm text-pink-300 shrink-0">
                        {item.pattern}
                      </code>
                      <span className="text-sm text-gray-400 truncate">{item.desc}</span>
                    </div>
                    <CopyButton text={item.pattern} className="shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
