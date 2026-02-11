import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Regex Toolkit - Free Online Regular Expression Tester",
  description: "Test, debug, and learn regular expressions online. Free regex tester with real-time matching, common patterns library, and easy-to-use interface.",
  keywords: "regex tester, regular expression, regex online, regex validator, regex matcher, regex patterns",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
