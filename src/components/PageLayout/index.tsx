"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/features/Header";
import Footer from "@/features/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabs = [
    { name: "現場地圖", path: "/map" },
    { name: "志工資訊", path: "/volunteer/preparation" },
    { name: "災民協助", path: "/victim/shelter" },
  ];

  const alerts = [
    "現場隨時有溢流風險，點此詳讀避難守則警報響起請往高處避難",
    "請注意個人安全，結伴同行更安全",
    "保持聯繫，手機保持電量",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % alerts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [alerts.length]);

  // Helper function to check if current pathname matches a tab's path prefix
  const isActiveTab = (tabPath: string) => {
    if (tabPath === "/map") {
      return pathname === "/map";
    }
    if (tabPath.startsWith("/volunteer")) {
      return pathname.startsWith("/volunteer");
    }
    if (tabPath.startsWith("/victim")) {
      return pathname.startsWith("/victim");
    }
    return pathname === tabPath;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      {/* Alert Banner Carousel */}
      <div>
        <div className="bg-[#FFEEBA] dark:bg-yellow-900/50 h-[64px] flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-[var(--text-black)] dark:text-yellow-100 font-medium">
              {alerts[currentSlide]}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 py-2 bg-white dark:bg-gray-900">
          {alerts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-[6px] h-[6px] rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-[var(--gray-2)] dark:bg-gray-300"
                  : "bg-[var(--gray-3)] dark:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <main className="flex-1 pb-[140px]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex border-b-2 border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                href={tab.path}
                className={`px-6 py-3 text-base font-medium border-b-4 transition-colors ${
                  isActiveTab(tab.path)
                    ? "border-[var(--primary)] dark:border-orange-500 text-[var(--primary)] dark:text-orange-400"
                    : "border-transparent text-[var(----text-black)] dark:text-gray-200 hover:text-[var(--primary)] dark:hover:text-orange-400"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>

          {/* Page Content */}
          <div className="mt-3">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
