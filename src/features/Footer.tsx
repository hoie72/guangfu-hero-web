import Link from "next/link";

export default function Footer() {
  // 點擊事件：發送 GA4 事件
  const handleClick = (label) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click_footer_button", {
        button_label: label,
        location: "footer",          // 你可以加這種自訂欄位，方便之後分析
        page_path: window.location.pathname,
      });
    }
  };

  return (
    <footer className="fixed h-[140px] bottom-0 left-0 right-0 w-full bg-[var(--light-gray-background)] text-white z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3 justify-center">
          <Link
            href="/resources"
            onClick={() => handleClick("物資媒合")}
            className="flex-1 max-w-[160px] bg-[var(--secondary)] hover:bg-[#166f8c] py-3 px-6 rounded-lg text-center font-bold transition-colors"
          >
            物資媒合
          </Link>
          <Link
            href="/volunteer-register"
            onClick={() => handleClick("志工媒合")}
            className="flex-1 max-w-[160px] bg-[var(--primary)] hover:bg-[#B55815] py-3 px-6 rounded-lg text-center font-bold transition-colors"
          >
            志工媒合
          </Link>
        </div>
      </div>
    </footer>
  );
}
