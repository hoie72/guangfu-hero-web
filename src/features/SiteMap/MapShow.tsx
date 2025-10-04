"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import {
  getWaterRefillStations,
  getShowerStations,
  type WaterRefillStations,
  type ShowerStations,
} from "@/lib/api";
import InfoCard from "@/components/InfoCard";

type LocationCategory =
  | "all"
  | "water_refill_stations"
  | "shower_stations"
  | "medical_stations"
  | "accommodations";
type ShowMode = "mapShow" | "listShow";

const CATEGORIES = [
  {
    key: "all",
    name: "全部",
  },
  {
    key: "water_refill_stations",
    name: "加水站",
  },
  {
    key: "shower_stations",
    name: "洗澡點",
  },
  {
    key: "restrooms",
    name: "廁所",
  },
  {
    key: "medical_stations",
    name: "醫療站",
  },
  {
    key: "accommodations",
    name: "住宿",
  },
];

const MAP_URL = "https://guangfu250923-map.pttapp.cc/map.html";
const MAP_HEIGHT = 422;

export default function MapShow() {
  const [showMode, setShowMode] = useState<ShowMode>("mapShow");
  const [selectedCategory, setSelectedCategory] =
    useState<LocationCategory>("all");
  const [waterRefillStations, setWaterRefillStations] = useState<
    WaterRefillStations[]
  >([]);
  const [showerStations, setShowerStations] = useState<ShowerStations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchWaterRefillStations() {
    try {
      setLoading(true);
      setError(null);
      const response = await getWaterRefillStations(50, 0);
      setWaterRefillStations(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入失敗");
    } finally {
      setLoading(false);
    }
  }

  async function fetchShowerStations() {
    try {
      setLoading(true);
      setError(null);
      const response = await getShowerStations(50, 0);
      setShowerStations(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入失敗");
    } finally {
      setLoading(false);
    }
  }

  const handleCategoryClick = async (categoryKey: LocationCategory) => {
    setSelectedCategory(categoryKey);
    if (categoryKey === "water_refill_stations") {
      await fetchWaterRefillStations();
    } else if (categoryKey === "shower_stations") {
      await fetchShowerStations();
    }
  };

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
                key={category.key}
                onClick={() =>
                  handleCategoryClick(category.key as LocationCategory)
                }
                active={selectedCategory === category.key}
              >
                {category.name}
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
        {showMode === "listShow" && (
          <div className="space-y-4">
            {loading && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                載入中...
              </div>
            )}

            {error && (
              <div className="text-center py-8 text-red-500 dark:text-red-400">
                錯誤: {error}
              </div>
            )}

            {!loading &&
              !error &&
              selectedCategory === "water_refill_stations" && (
                <>
                  {waterRefillStations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      此分類暫無資料
                    </div>
                  ) : (
                    waterRefillStations.map((station) => (
                      <InfoCard
                        key={station.id}
                        name={station.name}
                        type={station.water_type}
                        address={station.location}
                        contact={station.phone}
                        hours={station.opening_hours || ""}
                        mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          station.location
                        )}`}
                        fullData={station}
                      />
                    ))
                  )}
                </>
              )}

            {!loading && !error && selectedCategory === "shower_stations" && (
              <>
                {showerStations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    此分類暫無資料
                  </div>
                ) : (
                  showerStations.map((station) => (
                    <InfoCard
                      key={station.id}
                      name={station.name}
                      address={station.location}
                      contact={station.phone}
                      hours={station.opening_hours || ""}
                      mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.location
                      )}`}
                      fullData={station}
                    />
                  ))
                )}
              </>
            )}
          </div>
        )}
      </div>
      <br />
    </div>
  );
}
