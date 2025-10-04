import React, { useState } from 'react';
import Button from "@/components/Button";

type LocationCategory = "行前必讀" | "如何抵達光復" | "如何抵達災區";

export default function VolunteerInfo() {
  const [showMode, setShowMode] = useState('mapShow');

  const [selectedCategory, setSelectedCategory] =
      useState<LocationCategory>("全部");

  const handleChange = (event) => {
    setShowMode(event.target.value);
  };

  const categories: LocationCategory[] = [
    "全部",
    "加水站",
    "洗澡點",
    "醫療站",
    "住宿",
  ];

  return (
    <div className="p-1">
      <div className="p-3 text-center bg-red-500 text-white">
        現場隨時有溢流風險，點此詳讀避難守則<br />
        警報響起請往高處避難
      </div>
      <div className="flex my-3">
        <select className="bg-gray-100 p-3" value={showMode} onChange={handleChange}>
          <option value="mapShow">地圖顯示</option>
          <option value="listShow">列表顯示</option>
        </select>
        {showMode === "listShow" && (
          <div className="ml-4 flex overflow-y-scroll [scrollbar-width:none]">
            {categories.map((category) => (
              <Button
                className='ml-2 border-gray-100'
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
            src="https://guangfu250923-map.pttapp.cc/map.html"
            title="Example Website"
            width="100%"
            height="422"
          ></iframe>
        )}
        {showMode === "listShow" && (
          <div>列表todo</div>
        )}
      </div>
    </div>
  )
}