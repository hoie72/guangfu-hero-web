"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
import ClothingProtectionChecklist from "@/features/VolunteerInfo/ClothingProtectionChecklist";
import FootwearHandsChecklist from "@/features/VolunteerInfo/FootwearHandsChecklist";
import MedicalItemsChecklist from "@/features/VolunteerInfo/MedicalItemsChecklist";
import FoodSuppliesChecklist from "@/features/VolunteerInfo/FoodSuppliesChecklist";
import DisasterReliefToolsChecklist from "@/features/VolunteerInfo/DisasterReliefToolsChecklist";
import OtherEssentialChecklist from "./OtherEssentialChecklistProps";

type InfoCategory = "行前必讀" | "如何抵達光復" | "如何抵達災區";

export interface ChecklistItemData {
  id: string;
  label: string;
  description?: string | string[];
  highlight?: boolean;
}

export default function VolunteerInfo() {
  const [selectedCategory, setSelectedCategory] =
    useState<InfoCategory>("行前必讀");

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

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
          <div className="space-y-4">
            <Accordion title="確認資訊" icon="🔍">
              <p>查詢災區天氣、交通、人力需求等，評估自身情況</p>
            </Accordion>

            <Accordion title="加入志工" icon="📝">
              <p>加入個人志工 / 團隊志工 說明？</p>
            </Accordion>

            <Accordion title="行前準備" icon="🎒">
              <p>確認交通資訊、裝備（下滑有裝備清單）</p>
            </Accordion>

            <Accordion title="出發光復" icon="🚗">
              <p>切勿開車進入光復！ 買好回程車票，避免向隅</p>
            </Accordion>

            <Accordion title="進入災區" icon="⚠️">
              <p>抵達光復後，尋找聯絡人，帶你抵達災區目的地</p>
            </Accordion>

            <Accordion title="替換衣物再離開" icon="👕">
              <p>丟棄髒衣物，避免感染，也不造成他人困擾</p>
            </Accordion>

            {/* 裝備清單 */}
            <div className="mt-8">
              <div className="space-y-3">
                <h3 className="font-bold text-xl ">裝備清單</h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                  <ClothingProtectionChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                  <FootwearHandsChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                  <MedicalItemsChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                  <FoodSuppliesChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                  <DisasterReliefToolsChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                  <OtherEssentialChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
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
