"use client";

import { useState, useEffect } from "react";
import {
  getShelters,
  getMedicalStations,
  getMentalHealthResources,
  type Shelter,
  type MedicalStation,
  type MentalHealthResource,
} from "@/lib/api";
import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import ActionButton from "@/components/ActionButton";

type Category = "庇護所" | "醫療站" | "心理援助";
type ServiceFormat = "全部" | "實體" | "線上" | "電話" | "多種";

export default function VictimAssistance() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("庇護所");
  const [selectedServiceFormat, setSelectedServiceFormat] =
    useState<ServiceFormat>("全部");
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [medicalStations, setMedicalStations] = useState<MedicalStation[]>([]);
  const [mentalHealthResources, setMentalHealthResources] = useState<
    MentalHealthResource[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories: Category[] = ["庇護所", "醫療站", "心理援助"];
  const serviceFormats: ServiceFormat[] = [
    "全部",
    "實體",
    "線上",
    "電話",
    "多種",
  ];

  useEffect(() => {
    if (selectedCategory === "庇護所") {
      fetchShelters();
    } else if (selectedCategory === "醫療站") {
      fetchMedicalStations();
    } else if (selectedCategory === "心理援助") {
      fetchMentalHealthResources();
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

  async function fetchMentalHealthResources() {
    try {
      setLoading(true);
      setError(null);
      const response = await getMentalHealthResources(50, 0);
      setMentalHealthResources(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入失敗");
    } finally {
      setLoading(false);
    }
  }

  const filteredMentalHealthResources =
    selectedServiceFormat === "全部"
      ? mentalHealthResources
      : mentalHealthResources.filter(
          (resource) => resource.service_format === selectedServiceFormat
        );

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              if (category === "心理援助") {
                setSelectedServiceFormat("全部");
              }
            }}
            active={selectedCategory === category}
          >
            {category}
          </Button>
        ))}
      </div>

      {selectedCategory === "心理援助" && (
        <div className="flex gap-2 mb-3">
          {serviceFormats.map((format) => (
            <Button
              key={format}
              onClick={() => setSelectedServiceFormat(format)}
              active={selectedServiceFormat === format}
              variant="sub"
            >
              {format}
            </Button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {loading && (
          <div className="text-center py-8 text-gray-500">載入中...</div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">錯誤: {error}</div>
        )}

        {!loading && !error && selectedCategory === "庇護所" && (
          <div>
            {shelters.map((shelter) => (
              <InfoCard
                key={shelter.id}
                name={shelter.name}
                address={shelter.location}
                contact={shelter.phone}
                mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  shelter.location
                )}`}
              />
            ))}
          </div>
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
                    <ActionButton
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.detailed_address || station.location
                      )}`}
                      className="ml-4"
                    >
                      前往
                    </ActionButton>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {!loading && !error && selectedCategory === "心理援助" && (
          <>
            {filteredMentalHealthResources.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                此分類暫無資料
              </div>
            ) : (
              filteredMentalHealthResources.map((resource) => {
                let displayLocation = "未提供";
                let mapLocation = null;

                if (resource.location && resource.location !== "string") {
                  if (resource.location.startsWith("地點：")) {
                    const extractedLocation = resource.location.replace(
                      "地點：",
                      ""
                    );
                    displayLocation = extractedLocation;
                    mapLocation = extractedLocation;
                  } else {
                    displayLocation = resource.location;
                    mapLocation = resource.location;
                  }
                }

                return (
                  <div
                    key={resource.id}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold">{resource.name}</h3>
                          {resource.service_format &&
                            resource.service_format !== "string" && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                {resource.service_format}
                              </span>
                            )}
                        </div>
                        <div className="space-y-2 text-gray-700">
                          {resource.service_format &&
                            resource.service_format !== "string" && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500">🏷️</span>
                                <span className="font-medium">
                                  {resource.service_format}
                                </span>
                              </div>
                            )}
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500">📍</span>
                            <span>{displayLocation}</span>
                          </div>
                          {resource.contact_info &&
                            resource.contact_info !== "string" && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500">📞</span>
                                <span>{resource.contact_info}</span>
                              </div>
                            )}
                          {resource.service_hours &&
                            resource.service_hours !== "string" && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500">🕐</span>
                                <span>{resource.service_hours}</span>
                              </div>
                            )}
                          {resource.specialties &&
                            resource.specialties.length > 0 &&
                            resource.specialties[0] !== "string" && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500">💡</span>
                                <span>
                                  專長：{resource.specialties.join("、")}
                                </span>
                              </div>
                            )}
                          {resource.target_audience &&
                            resource.target_audience.length > 0 &&
                            resource.target_audience[0] !== "string" && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500">👥</span>
                                <span>
                                  服務對象：
                                  {resource.target_audience.join("、")}
                                </span>
                              </div>
                            )}
                          {resource.languages &&
                            resource.languages.length > 0 &&
                            resource.languages[0] !== "string" && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500">🗣️</span>
                                <span>
                                  語言：{resource.languages.join("、")}
                                </span>
                              </div>
                            )}
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500">💰</span>
                            <span>
                              {resource.is_free ? "免費服務" : "付費服務"}
                            </span>
                          </div>
                          {resource.emergency_support && (
                            <div className="flex items-start gap-2">
                              <span className="text-gray-500">🚨</span>
                              <span className="text-red-600 font-medium">
                                提供緊急支援
                              </span>
                            </div>
                          )}
                          {resource.capacity > 0 && (
                            <div className="flex items-start gap-2">
                              <span className="text-gray-500">📊</span>
                              <span>容量：{resource.capacity}</span>
                            </div>
                          )}
                          {resource.waiting_time &&
                            resource.waiting_time !== "string" && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500">⏱️</span>
                                <span>等候時間：{resource.waiting_time}</span>
                              </div>
                            )}
                          {resource.notes && resource.notes !== "string" && (
                            <div className="flex items-start gap-2">
                              <span className="text-gray-500">📝</span>
                              <span className="text-sm text-gray-600">
                                {resource.notes}
                              </span>
                            </div>
                          )}
                          {resource.website_url &&
                            resource.website_url !== "string" && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500">🔗</span>
                                <a
                                  href={resource.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                                >
                                  網站連結
                                </a>
                              </div>
                            )}
                        </div>
                      </div>
                      {mapLocation && (
                        <ActionButton
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            mapLocation
                          )}`}
                          className="ml-4"
                        >
                          前往
                        </ActionButton>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
