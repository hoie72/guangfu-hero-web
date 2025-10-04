"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

type ViewMode = "地圖顯示" | "列表顯示";

export default function SiteMap() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");

  const [selectedViewMode, setSelectedViewMode] =
    useState<ViewMode>("地圖顯示");

  const viewModes: ViewMode[] = ["地圖顯示", "列表顯示"];

  useEffect(() => {
    if (viewParam === "list") {
      setSelectedViewMode("列表顯示");
    }
  }, [viewParam]);

  return (
    <div>
      {/* 跑馬燈 */}
      <div className="bg-[#FFF4E6] border-l-4 border-[#C96319] p-4 mb-6 overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg
              className="w-5 h-5 text-[#C96319]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap">
              <span className="inline-block animate-marquee text-[#C96319] font-medium">
                現場隨時有溢流風險，點此詳讀避難守則，警報響起請往高處避難
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                現場隨時有溢流風險，點此詳讀避難守則，警報響起請往高處避難
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        {viewModes.map((mode) => (
          <Button
            key={mode}
            onClick={() => setSelectedViewMode(mode)}
            active={selectedViewMode === mode}
          >
            {mode}
          </Button>
        ))}
      </div>

      <div>
        {selectedViewMode === "地圖顯示" && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">地圖顯示</h2>
            <p className="text-gray-600">地圖內容將顯示在這裡</p>
          </div>
        )}

        {selectedViewMode === "列表顯示" && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">列表顯示</h2>
            <p className="text-gray-600">列表內容將顯示在這裡</p>
          </div>
        )}
      </div>
    </div>
  );
}
