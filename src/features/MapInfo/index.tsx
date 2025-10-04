import React, { useState } from "react";
import Button from "@/components/Button";

type LocationCategory = "全部" | "加水站" | "洗澡點" | "醫療站" | "住宿";
type ShowMode = "mapShow" | "listShow";

const CATEGORIES: LocationCategory[] = [
  "全部",
  "加水站",
  "洗澡點",
  "醫療站",
  "住宿",
];

const MAP_URL = "https://guangfu250923-map.pttapp.cc/map.html";
const MAP_HEIGHT = 422;

export default function MapInfo() {
  const [showMode, setShowMode] = useState<ShowMode>("mapShow");
  const [selectedCategory, setSelectedCategory] =
    useState<LocationCategory>("全部");

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowMode(event.target.value as ShowMode);
  };

  return (
    <div>
      <div className="flex my-3">
        <select
          className="bg-gray-100 p-3"
          value={showMode}
          onChange={handleModeChange}
        >
          <option value="mapShow">地圖顯示</option>
          <option value="listShow">列表顯示</option>
        </select>
        {showMode === "listShow" && (
          <div className="ml-4 flex overflow-y-scroll [scrollbar-width:none]">
            {CATEGORIES.map((category) => (
              <Button
                className="ml-2 border-gray-100"
                key={category}
                onClick={() => setSelectedCategory(category)}
                active={selectedCategory === category}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div>
        {showMode === "mapShow" && (
          <iframe
            src={MAP_URL}
            title="地圖顯示"
            width="100%"
            height={MAP_HEIGHT}
          />
        )}
        {showMode === "listShow" && <div>列表todo</div>}
      </div>
    </div>
  );
}
