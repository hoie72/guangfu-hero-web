"use client";

import { useState } from "react";

type Category = "庇護所" | "醫療站" | "心理援助";

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  category: Category;
}

const mockLocations: Location[] = [
  {
    id: 1,
    name: "大連國小收容中心安心站",
    address: "花蓮縣光復鄉糖廠街4號",
    phone: "法鼓山花蓮精舍 03-834-2758",
    category: "庇護所",
  },
  {
    id: 2,
    name: "花蓮糖廠中央倉庫",
    address: "光復鄉糖廠街19號",
    phone: "張先生 0958-080-620/東服中心 03-835-0080",
    category: "庇護所",
  },
  {
    id: 3,
    name: "花蓮縣光復鄉東富村",
    address: "花蓮縣光復鄉東富村富田三街21號",
    phone: "陳榮委員服務團隊 0910-710067",
    category: "庇護所",
  },
  {
    id: 4,
    name: "大安活動中心",
    address: "花蓮縣光復鄉忠孝路23巷11號1樓",
    phone:
      "大安村村長徐振雄 0972-125030/大連村村長林正立 0908-939530/大全村村長林淑珍 0939-772885/大平村村長",
    category: "庇護所",
  },
];

export default function VictimAssistance() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    "庇護所"
  );

  const categories: Category[] = [
    "庇護所",
    "醫療站",
    "心理援助",
  ];

  const filteredLocations = mockLocations.filter((loc) => loc.category === selectedCategory);

  return (
    <div>
      {/* Category filters */}
      <div className="flex gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Location list */}
      <div className="space-y-4">
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">{location.name}</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">📍</span>
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">📞</span>
                    <span>{location.phone}</span>
                  </div>
                </div>
              </div>
              <button className="ml-4 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap">
                前往 →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom action buttons */}
      <div className="flex gap-4 mt-8">
        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
          找 / 送物資
        </button>
        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
          當 / 找志工
        </button>
      </div>
    </div>
  );
}
