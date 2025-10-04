import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-[#F7EBE0] dark:bg-gray-900 text-white z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3 justify-center">
          <Link
            href="/resources"
            className="flex-1 max-w-[160px] bg-[#C96319] dark:bg-orange-700 hover:bg-[#B55815] dark:hover:bg-orange-600 py-3 px-6 rounded-lg text-center font-bold transition-colors"
          >
            找 / 送物資
          </Link>
          <Link
            href="/volunteer-register"
            className="flex-1 max-w-[160px] bg-[#C96319] dark:bg-orange-700 hover:bg-[#B55815] dark:hover:bg-orange-600 py-3 px-6 rounded-lg text-center font-bold transition-colors"
          >
            當 / 找志工
          </Link>
        </div>
      </div>
    </footer>
  );
}
