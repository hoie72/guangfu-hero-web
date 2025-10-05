"use client";

import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--text-black)] dark:bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 dark:border-gray-800">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col">
          <Link
            href="/map"
            className="px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 border-b border-gray-800"
            onClick={onClose}
          >
            地圖列表
          </Link>

          {/* 志工資訊 with submenu */}
          <div className="border-b border-gray-800">
            <button
              onClick={() => toggleSection("volunteer")}
              className="w-full px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 flex justify-between items-center"
            >
              <span>志工資訊</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  expandedSection === "volunteer" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedSection === "volunteer" && (
              <div className="bg-[#2A2A2A] dark:bg-gray-800">
                <Link
                  href="/volunteer/preparation"
                  className="block px-8 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  行前必讀
                </Link>
                <Link
                  href="/volunteer/transportation"
                  className="block px-8 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  交通資訊
                </Link>
                <Link
                  href="/map?view=list"
                  className="block px-8 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  住宿資訊
                </Link>
              </div>
            )}
          </div>

          {/* 災民協助 with submenu */}
          <div className="border-b border-gray-800">
            <button
              onClick={() => toggleSection("victim")}
              className="w-full px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 flex justify-between items-center"
            >
              <span>災民協助</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  expandedSection === "victim" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedSection === "victim" && (
              <div className="bg-[#2A2A2A] dark:bg-gray-800">
                <Link
                  href="/victim/shelter"
                  className="block px-8 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  庇護所
                </Link>
                <Link
                  href="/victim/medical"
                  className="block px-8 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  醫療站
                </Link>
                <Link
                  href="/victim/mental-health"
                  className="block px-8 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  心理援助
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/resources"
            className="px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 border-b border-gray-800"
            onClick={onClose}
          >
            物資媒合
          </Link>

          <Link
            href="/volunteer-register"
            className="px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 border-b border-gray-800"
            onClick={onClose}
          >
            志工媒合
          </Link>

          <a
            href="#team"
            className="px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 border-b border-gray-800"
          >
            關於我們
          </a>

          <Link
            href="/privacy"
            className="px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 border-b border-gray-800"
            onClick={onClose}
          >
            隱私權政策
          </Link>

          <Link
            href="/terms"
            className="px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 border-b border-gray-800"
            onClick={onClose}
          >
            服務條款
          </Link>
        </nav>
      </div>
    </>
  );
}
