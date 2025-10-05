"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "@/features/Header";
import Footer from "@/features/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();

  const tabs = [
    { name: "現場地圖", path: "/map" },
    { name: "志工資訊", path: "/volunteer/preparation" },
    { name: "災民協助", path: "/victim/shelter" },
  ];

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
