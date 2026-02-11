import Footer from "@/components/Footer";
import Link from "next/link";

const patterns = [
  {
    category: "Email & Web",
    items: [
      { name: "Email Address", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", example: "user@example.com" },
      { name: "URL (HTTP/HTTPS)", pattern: "https?://[\\w\\-._~:/?#\\[\\]@!$&'()*+,;=%]+", example: "https://example.com/path" },
      { name: "Domain Name", pattern: "[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}", example: "example.com" },
      { name: "IPv4 Address", pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", example: "192.168.1.1" },
      { name: "IPv6 Address", pattern: "([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}", example: "2001:0db8:85a3:0000:0000:8a2e:0370:7334" },
    ],
  },
  {
    category: "Phone Numbers",
    items: [
      { name: "US Phone", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", example: "(123) 456-7890" },
      { name: "International Phone", pattern: "\\+?[1-9]\\d{1,14}", example: "+14155552671" },
      { name: "China Phone", pattern: "1[3-9]\\d{9}", example: "13812345678" },
    ],
  },
  {
    category: "Date & Time",
    items: [
      { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])", example: "2024-12-31" },
      { name: "Date (MM/DD/YYYY)", pattern: "(?:0[1-9]|1[0-2])/(?:0[1-9]|[12]\\d|3[01])/\\d{4}", example: "12/31/2024" },
      { name: "Time (24h)", pattern: "(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?", example: "23:59:59" },
      { name: "ISO 8601 DateTime", pattern: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:\\d{2})?", example: "2024-12-31T23:59:59Z" },
    ],
  },
  {
    category: "Numbers",
    items: [
      { name: "Integer", pattern: "-?\\d+", example: "-123" },
      { name: "Decimal Number", pattern: "-?\\d+\\.\\d+", example: "3.14159" },
      { name: "Hex Number", pattern: "0x[0-9A-Fa-f]+", example: "0x1A3F" },
      { name: "Scientific Notation", pattern: "-?\\d+(?:\\.\\d+)?[eE][+-]?\\d+", example: "1.23e-4" },
      { name: "Percentage", pattern: "\\d+(?:\\.\\d+)?%", example: "99.9%" },
    ],
  },
  {
    category: "Code & Development",
    items: [
      { name: "Hex Color", pattern: "#(?:[0-9A-Fa-f]{3}){1,2}\\b", example: "#FF5733" },
      { name: "UUID", pattern: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}", example: "550e8400-e29b-41d4-a716-446655440000" },
      { name: "MAC Address", pattern: "(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}", example: "00:1A:2B:3C:4D:5E" },
      { name: "HTML Tag", pattern: "<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>.*?</\\1>", example: "<div>content</div>" },
      { name: "JSON Key", pattern: '"([^"]+)"\\s*:', example: '"key":' },
    ],
  },
  {
    category: "Text Validation",
    items: [
      { name: "Username (alphanumeric)", pattern: "^[a-zA-Z0-9_]{3,16}$", example: "user_123" },
      { name: "Strong Password", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", example: "Pass@123" },
      { name: "Slug (URL-friendly)", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", example: "my-blog-post" },
      { name: "No Whitespace", pattern: "^\\S+$", example: "no_spaces" },
    ],
  },
];

export default function PatternsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold text-white">Common Regex Patterns</h1>
        <p className="mb-8 text-gray-400">Ready-to-use patterns for common validation tasks</p>

        <div className="space-y-8">
          {patterns.map((section) => (
            <div key={section.category}>
              <h2 className="mb-4 text-xl font-semibold text-purple-400">{section.category}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <div key={item.name} className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{item.name}</h3>
                      <Link
                        href={`/tester?pattern=${encodeURIComponent(item.pattern)}`}
                        className="text-xs text-purple-400 hover:text-purple-300"
                      >
                        Try it →
                      </Link>
                    </div>
                    <code className="block rounded bg-gray-800 p-2 font-mono text-xs text-pink-300 break-all mb-2">
                      {item.pattern}
                    </code>
                    <p className="text-xs text-gray-500">
                      Example: <span className="text-gray-400">{item.example}</span>
                    </p>
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
