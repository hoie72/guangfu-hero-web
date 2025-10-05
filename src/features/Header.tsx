"use client";

import { useState } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import AlertBanner from "@/components/AlertBanner";
import WarningModal from "@/components/WarningModal";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleShare = async () => {
    // 確保在瀏覽器環境中執行
    if (typeof window === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "花蓮援助平台",
          text: "提供花蓮地區災害援助資訊、志工招募與災民協助服務",
          url: window.location.href,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("分享失敗:", error);
        }
      }
    } else {
      // Fallback: 複製連結到剪貼簿
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("連結已複製到剪貼簿");
      } catch (error) {
        console.error("複製失敗:", error);
      }
    }
  };

  return (
    <>
      <header className="w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            {/* Left: Hamburger menu */}
            <button
              className="p-2 rounded-md text-white"
              aria-label="開啟選單"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                className="h-6 w-6 stroke-gray-500 dark:stroke-gray-300 hover:stroke-gray-700 dark:hover:stroke-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            {/* Center: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/map">
                <Image
                  src={getAssetPath("/logo_new.svg")}
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto cursor-pointer"
                />
              </Link>
            </div>

            {/* Right: Share icon */}
            <button className="p-2" aria-label="分享" onClick={handleShare}>
              <Image
                src={getAssetPath("/share.svg")}
                alt="分享"
                width={24}
                height={24}
                className="dark:invert"
              />
            </button>
          </div>
        </div>
      </header>

      <AlertBanner onAlertClick={() => setShowWarningModal(true)} />
      <WarningModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
