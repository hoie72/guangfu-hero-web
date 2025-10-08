"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import Toast2 from "@/components/Toast2";

export default function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 新增：登入 Modal 狀態
  const [loginOpen, setLoginOpen] = useState(false);
  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  // 觸發 LINE SSO
  const startLineLogin = () => {
    if (typeof window === "undefined") return;

    // 可選：讓登入後能回到原頁面
    const next = encodeURIComponent(
      (window.location.pathname || "/") + (window.location.search || "")
    );

    // state 可用來攜帶 callback 或自訂資訊
    const state = encodeURIComponent(
      JSON.stringify({
        next,
      })
    );
    // 重新導向到你後端的 LINE OAuth 起始點
    window.location.href = `https://guangfu250923.pttapp.cc/auth/line/start?state=${encodeURIComponent(
      state
    )}&redirect_uri=${encodeURIComponent(
      `${window.location.origin}/auth/line/callback`
    )}`;
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}${pathname}`;

    const getTitle = () => {
      if (pathname.startsWith("/map")) return "光復超人 - 現場地圖";
      if (pathname.startsWith("/volunteer")) return "光復超人 - 志工資訊";
      if (pathname.startsWith("/victim")) return "光復超人 - 災民協助";
      return "光復超人";
    };

    const title = getTitle();

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch (error: any) {
        if (!(error instanceof Error && error.name === "AbortError")) {
          await fallbackToCopy(shareUrl);
        }
      }
    } else {
      await fallbackToCopy(shareUrl);
    }
  };

  const fallbackToCopy = async (url: string) => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      console.warn("Clipboard API 不可用 - 需要 HTTPS 或 localhost 環境");
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShowToast(true);
    } catch (error) {
      console.error("複製失敗:", error);
    }
  };

  return (
    <>
      <header className="w-full shadow-sm fixed top-0 bg-white z-20">
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
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/map" aria-label="前往地圖">
                <Image
                  src={getAssetPath("/logo_new.svg")}
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto cursor-pointer"
                />
              </Link>
            </div>

            {/* Right: Share + Login */}
            <div className="flex items-center gap-2">
              <button className="p-2" aria-label="分享" onClick={handleShare}>
                <Image
                  src={getAssetPath("/share.svg")}
                  alt="分享"
                  width={24}
                  height={24}
                />
              </button>

              {/* 根據 localStorage 判斷是否已使用 LINE 登入，顯示登出或開啟登入 Modal */}
              {/* {typeof window !== "undefined" &&
              localStorage.getItem("line_oauth_state") ? (
                <button
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-500"
                  onClick={() => {
                    // 清除與 LINE 登入相關的 localStorage（根據實際鍵名調整）
                    localStorage.removeItem("line_oauth_state");
                    // 若有後端登出接口，也可以在這裡呼叫，或直接重新載入頁面更新 UI
                    window.location.reload();
                  }}
                >
                  登出
                </button>
              ) : (
                <button
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800"
                  onClick={openLogin}
                >
                  Login
                </button>
              )} */}
            </div>
          </div>
        </div>
      </header>

      {/* 側邊欄 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Toast 提示 */}
      <Toast2
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />

      {/* === Login Modal === */}
      {loginOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          onClick={closeLogin}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal 本體 */}
          <div
            className="relative w-full max-w-sm mx-4 rounded-2xl bg-white shadow-xl p-6"
            onClick={(e) => e.stopPropagation()} // 阻止冒泡，避免點內容就關閉
          >
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                選擇登入方式
              </h3>
              <button
                className="p-2 -m-2 rounded-md text-gray-500 hover:bg-gray-100"
                aria-label="關閉"
                onClick={closeLogin}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              你可以使用 LINE 快速登入。
            </p>

            <div className="mt-5 space-y-3">
              {/* LINE 登入 */}
              <button
                onClick={startLineLogin}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#000000] text-white py-2.5 text-sm font-medium hover:brightness-95"
              >
                <Image src="/line.svg" alt="" width={48} height={48} />
                使用 LINE 登入
              </button>

              {/* 需要其他 Provider 時可以在這裡加 */}
              {/* <button className="w-full ...">Google</button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
