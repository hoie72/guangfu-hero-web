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
