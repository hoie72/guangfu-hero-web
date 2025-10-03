"use client";

import { useState } from "react";
import Button from "@/components/Button";

type InfoCategory = "行前必讀" | "如何抵達光復" | "如何抵達災區";

export default function VolunteerInfo() {
  const [selectedCategory, setSelectedCategory] =
    useState<InfoCategory>("行前必讀");

  const categories: InfoCategory[] = [
    "行前必讀",
    "如何抵達光復",
    "如何抵達災區",
  ];

  return (
    <div>
      {/* 按鈕列表 - 支援橫向滾動 */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-3 mb-6 min-w-max">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              active={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* 內容區域 */}
      <div className="space-y-4">
        {selectedCategory === "行前必讀" && (
          <div className="space-y-6">
            {/* 重要提醒 */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
              <h3 className="font-bold text-orange-900 mb-2">⚠️ 重要提醒</h3>
              <ul className="space-y-1 text-sm text-orange-800">
                <li>• 請務必攜帶身分證件</li>
                <li>• 建議穿著長袖長褲及工作雨鞋</li>
                <li>• 事前擦防曬</li>
                <li>• 自備飲用水及個人藥品</li>
                <li>• 注意自身安全，聽從現場指揮</li>
                <li>• 記得休息</li>
              </ul>
            </div>

            {/* 建議攜帶物品 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4">建議攜帶物品</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">個人物品</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 身分證件</li>
                    <li>• 健保卡</li>
                    <li>• 手機及充電器</li>
                    <li>• 個人藥品</li>
                    <li>• 防曬用品</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">工作裝備</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 工作手套</li>
                    <li>• 口罩</li>
                    <li>• 帽子</li>
                    <li>• 雨具</li>
                    <li>• 個人餐具及水壺</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCategory === "如何抵達光復" && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">如何抵達光復</h2>
            <p className="text-gray-600">如何抵達光復的內容將顯示在這裡</p>
          </div>
        )}

        {selectedCategory === "如何抵達災區" && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">如何抵達災區</h2>
            <p className="text-gray-600">如何抵達災區的內容將顯示在這裡</p>
          </div>
        )}
      </div>
    </div>
  );
}
