"use client";

import { useState, useEffect } from "react";
import {
  getShelters,
  getMedicalStations,
  type Shelter,
  type MedicalStation,
} from "@/lib/api";

type Category = "庇護所" | "醫療站" | "心理援助";

export default function VictimAssistance() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("庇護所");
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [medicalStations, setMedicalStations] = useState<MedicalStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories: Category[] = ["庇護所", "醫療站", "心理援助"];

  useEffect(() => {
    if (selectedCategory === "庇護所") {
      fetchShelters();
    } else if (selectedCategory === "醫療站") {
      fetchMedicalStations();
    } else {
      setLoading(false);
    }
  }, [selectedCategory]);

  async function fetchShelters() {
    try {
      setLoading(true);
      setError(null);
      const response = await getShelters(50, 0);
      setShelters(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入失敗");
    } finally {
      setLoading(false);
    }
  }

  async function fetchMedicalStations() {
    try {
      setLoading(true);
      setError(null);
      const response = await getMedicalStations(50, 0);
      setMedicalStations(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入失敗");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
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

      <div className="space-y-4">
        {loading && (
          <div className="text-center py-8 text-gray-500">載入中...</div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">錯誤: {error}</div>
        )}

        {!loading && !error && selectedCategory === "庇護所" && (
          <>
            {shelters.map((shelter) => (
              <div
                key={shelter.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{shelter.name}</h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500">📍</span>
                        <span>{shelter.location}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500">📞</span>
                        <span>{shelter.phone}</span>
                      </div>
                      {shelter.contact_person &&
                        shelter.contact_person !== shelter.phone && (
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500">👤</span>
                            <span>{shelter.contact_person}</span>
                          </div>
                        )}
                      {shelter.coordinates && (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">🗺️</span>
                          <span className="text-sm">{shelter.coordinates}</span>
                        </div>
                      )}
                      {shelter.opening_hours && (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">🕐</span>
                          <span>{shelter.opening_hours}</span>
                        </div>
                      )}
                      {shelter.facilities && (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">🏢</span>
                          <span>{shelter.facilities}</span>
                        </div>
                      )}
                      {shelter.notes && (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">📝</span>
                          <span className="text-sm text-gray-600">
                            {shelter.notes}
                          </span>
                        </div>
                      )}
                      {shelter.link && (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">🔗</span>
                          <a
                            href={shelter.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                          >
                            資料來源
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      shelter.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap"
                  >
                    前往 →
                  </a>
                </div>
              </div>
            ))}
          </>
        )}

        {!loading && !error && selectedCategory === "醫療站" && (
          <>
            {medicalStations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                此分類暫無資料
              </div>
            ) : (
              medicalStations.map((station) => (
                <div
                  key={station.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{station.name}</h3>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">🏥</span>
                          <span className="font-medium">
                            {station.station_type || "未提供"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">📍</span>
                          <span>
                            {station.detailed_address ||
                              station.location ||
                              "未提供"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">📞</span>
                          <span>{station.phone || "未提供"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">👤</span>
                          <span>{station.contact_person || "未提供"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">🕐</span>
                          <span>{station.operating_hours || "未提供"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">💊</span>
                          <span>
                            {station.services && station.services.length > 0
                              ? station.services.join("、")
                              : "未提供"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">🏢</span>
                          <span>
                            {station.affiliated_organization || "未提供"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">👨‍⚕️</span>
                          <span>
                            醫護人員：
                            {station.medical_staff > 0
                              ? `${station.medical_staff} 人`
                              : "未提供"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">📊</span>
                          <span>
                            每日容量：
                            {station.daily_capacity > 0
                              ? `${station.daily_capacity} 人`
                              : "未提供"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">📝</span>
                          <span className="text-sm text-gray-600">
                            {station.notes || "未提供"}
                          </span>
                        </div>
                        {station.link && (
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500">🔗</span>
                            <a
                              href={station.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                            >
                              資料來源
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.detailed_address || station.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap"
                    >
                      前往 →
                    </a>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {!loading && !error && selectedCategory === "心理援助" && (
          <div className="text-center py-8 text-gray-500">此分類暫無資料</div>
        )}
      </div>
    </div>
  );
}
