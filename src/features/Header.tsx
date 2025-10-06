"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import AlertBanner from "@/components/AlertBanner";
import WarningModal from "@/components/WarningModal";
import Toast from "@/components/Toast";

export default function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    // URL
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}${pathname}`;

    // 根據路徑決定標題
    const getTitle = () => {
      if (pathname.startsWith("/map")) return "光復超人 - 現場地圖";
      if (pathname.startsWith("/volunteer")) return "光復超人 - 志工資訊";
      if (pathname.startsWith("/victim")) return "光復超人 - 災民協助";
      return "光復超人";
    };

    const title = getTitle();
    const text = "花蓮光復鄉災害援助資訊平台";

    // 優先使用 Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: shareUrl,
        });
      } catch (error) {
        // if不支援分享功能 轉為複製功能
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          error.name !== "NotAllowedError"
        ) {
          // 回退到複製功能
          await fallbackToCopy(shareUrl);
        }
      }
    } else {
      // if 不支援 Web Share API 使用複製功能
      await fallbackToCopy(shareUrl);
    }
  };

  const fallbackToCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setShowToast(true);
    } catch (error) {
      console.error("複製失敗:", error);
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
                className="h-6 w-6 stroke-gray-500 hover:stroke-gray-700"
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

      {/* Toast */}
      <Toast
        message="複製成功"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
