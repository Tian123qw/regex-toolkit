export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 py-6">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Regex Toolkit. Free online regex tester.</p>
      </div>
    </footer>
  );
}
