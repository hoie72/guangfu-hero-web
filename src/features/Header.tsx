"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import AlertBanner from "@/components/AlertBanner";
import WarningModal from "@/components/WarningModal";
import Toast2 from "@/components/Toast2"; // Share Icon 專用的 Toast

export default function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    if (typeof window === "undefined") return;

    // 建構完整 URL
    const shareUrl = window.location.href;

    // 使用最簡單可靠的方法（execCommand）
    const textarea = document.createElement("textarea");
    textarea.value = shareUrl;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      
      if (successful) {
        setShowToast(true);
      } else {
        alert(`請手動複製連結：\n${shareUrl}`);
      }
    } catch (err) {
      document.body.removeChild(textarea);
      alert(`請手動複製連結：\n${shareUrl}`);
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
                className="h-6 w-6 stroke-[var(--gray)] hover:stroke-gray-700"
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
      
      {/* Toast2 - Share Icon */}
      <Toast2
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}