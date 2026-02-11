"use client";
import { useState, useMemo } from "react";
import CopyButton from "@/components/CopyButton";

const commonPatterns = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?://[\\w\\-._~:/?#\\[\\]@!$&'()*+,;=%]+" },
  { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}" },
  { name: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  { name: "Hex Color", pattern: "#[0-9A-Fa-f]{6}\\b" },
  { name: "Integer", pattern: "-?\\d+" },
  { name: "Decimal", pattern: "-?\\d+\\.\\d+" },
];

export default function TesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState(`Contact Information:
Email: john.doe@example.com, support@company.org
Phone: (123) 456-7890, 555-123-4567
Website: https://www.example.com/path?query=123

Server Details:
IP Address: 192.168.1.1, 10.0.0.255
Date: 2024-12-31, 2025-01-15
Time: 14:30:00

Design Tokens:
Colors: #FF5733, #00FF00, #336699
Numbers: 42, -17, 3.14159, 100

Sample Text:
The quick brown fox jumps over 99 lazy dogs.
Price: $19.99 (50% off!)`);
  const [error, setError] = useState<string | null>(null);

  const { matches, highlightedText } = useMemo(() => {
    if (!pattern) return { matches: [], highlightedText: testText };
    
    try {
      const regex = new RegExp(pattern, flags);
      setError(null);
      
      const matchList: { match: string; index: number; groups?: string[] }[] = [];
      let match;
      
      if (flags.includes("g")) {
        while ((match = regex.exec(testText)) !== null) {
          matchList.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1).length > 0 ? match.slice(1) : undefined,
          });
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          matchList.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1).length > 0 ? match.slice(1) : undefined,
          });
        }
      }

      // Build highlighted text
      let highlighted = "";
      let lastIndex = 0;
      const sortedMatches = [...matchList].sort((a, b) => a.index - b.index);
      
      for (const m of sortedMatches) {
        highlighted += escapeHtml(testText.slice(lastIndex, m.index));
        highlighted += `<mark class="bg-purple-500/40 text-purple-200 rounded px-0.5">${escapeHtml(m.match)}</mark>`;
        lastIndex = m.index + m.match.length;
      }
      highlighted += escapeHtml(testText.slice(lastIndex));

      return { matches: matchList, highlightedText: highlighted };
    } catch (e) {
      setError((e as Error).message);
      return { matches: [], highlightedText: testText };
    }
  }, [pattern, flags, testText]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => (prev.includes(flag) ? prev.replace(flag, "") : prev + flag));
  };

  const applyPattern = (p: string) => {
    setPattern(p);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Pattern Input */}
      <div className="border-b border-gray-800 bg-gray-900/50 p-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="flex items-center rounded-lg border border-gray-700 bg-gray-800 focus-within:border-purple-500">
                <span className="pl-3 text-gray-500">/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern..."
                  className="flex-1 bg-transparent px-2 py-2.5 font-mono text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <span className="text-gray-500">/</span>
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-12 bg-transparent px-2 py-2.5 font-mono text-sm text-purple-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {["g", "i", "m", "s"].map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFlag(f)}
                  className={`rounded px-3 py-2 text-sm font-mono transition-colors ${
                    flags.includes(f)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  title={f === "g" ? "Global" : f === "i" ? "Case insensitive" : f === "m" ? "Multiline" : "Dotall"}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-400">Error: {error}</p>}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Test Text */}
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-800">
          <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/30 px-4 py-2">
            <span className="text-sm font-medium text-gray-400">Test String</span>
            <CopyButton text={testText} />
          </div>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Enter text to test against..."
            className="flex-1 resize-none bg-transparent p-4 font-mono text-sm text-gray-200 placeholder-gray-600 focus:outline-none"
          />
        </div>

        {/* Results */}
        <div className="flex-1 flex flex-col min-h-[200px] lg:min-h-0">
          <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/30 px-4 py-2">
            <span className="text-sm font-medium text-gray-400">
              Matches ({matches.length})
            </span>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {/* Highlighted preview */}
            <div className="mb-4">
              <p className="mb-2 text-xs text-gray-500 uppercase tracking-wide">Preview</p>
              <div
                className="rounded-lg border border-gray-800 bg-gray-900 p-3 font-mono text-sm text-gray-300 whitespace-pre-wrap break-all"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </div>

            {/* Match list */}
            {matches.length > 0 && (
              <div>
                <p className="mb-2 text-xs text-gray-500 uppercase tracking-wide">Match Details</p>
                <div className="space-y-2">
                  {matches.map((m, i) => (
                    <div key={i} className="rounded-lg border border-gray-800 bg-gray-900 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Match {i + 1} at index {m.index}</span>
                        <CopyButton text={m.match} />
                      </div>
                      <p className="mt-1 font-mono text-sm text-purple-300 break-all">{m.match}</p>
                      {m.groups && (
                        <div className="mt-2 text-xs text-gray-500">
                          Groups: {m.groups.map((g, j) => (
                            <span key={j} className="ml-1 text-pink-400">[{j + 1}] {g}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Common Patterns */}
      <div className="border-t border-gray-800 bg-gray-900/50 p-4">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-xs text-gray-500 uppercase tracking-wide">Quick Patterns</p>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPattern(p.pattern)}
                className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs text-gray-300 transition-colors hover:border-purple-500 hover:text-purple-300"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
