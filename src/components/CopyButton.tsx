"use client";
import { useState } from "react";

export default function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className={`rounded px-2 py-1 text-xs transition-colors ${copied ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"} ${className}`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
