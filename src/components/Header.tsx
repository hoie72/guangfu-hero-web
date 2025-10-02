import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏔️</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              關於我們
            </Link>
            <Link
              href="#resources"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              資源分類
            </Link>
            <Link
              href="#help"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              如何幫助
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              聯絡我們
            </Link>
            <Link
              href="#donate"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              立即捐款
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="開啟選單"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
