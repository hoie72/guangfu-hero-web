"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ActionButton from "@/components/ActionButton";
import {
  type Shelter,
  type MedicalStation,
  type MentalHealthResource,
} from "@/lib/api";
import dayjs from "dayjs";

type DataType = Shelter | MedicalStation | MentalHealthResource;

interface InfoCardProps {
  name: string;
  address?: string;
  type?: string;
  hours?: string;
  contact?: string;
  infoUrl?: string;
  mapUrl?: string;
  className?: string;
  fullData?: DataType;
}

// 欄位名稱對應表
const fieldLabels: Record<string, string> = {
  address: "地址",
  affiliated_organization: "所屬單位",
  capacity: "容量",
  contact_info: "聯絡資訊",
  contact_person: "聯絡人",
  created_at: "建立時間",
  daily_capacity: "每日可收納",
  detailed_address: "地址",
  emergency_support: "緊急支援",
  equipment: "設備",
  facilities: "設施",
  is_free: "是否免費",
  languages: "語言",
  link: "連結",
  location: "地點",
  medical_staff: "醫療人員",
  name: "名稱",
  note: "備註",
  notes: "備註",
  opening_hours: "開放時間",
  operating_hours: "營運時間",
  phone: "電話",
  service_format: "服務形式",
  service_hours: "服務時間",
  services: "提供服務",
  specialties: "專長",
  station_type: "類型",
  status: "狀態",
  target_audience: "服務對象",
  updated_at: "更新時間",
  waiting_time: "等候時間",
  website_url: "網站",
};

// 不顯示的欄位
const excludeFields = ["id", "coordinates"];

// 需轉換時間欄位
const timeFields = ["created_at", "updated_at"];

const InfoCard: React.FC<InfoCardProps> = ({
  name,
  address,
  type,
  hours,
  contact,
  mapUrl,
  className = "",
  fullData,
}) => {
  const [showModal, setShowModal] = useState(false);

  // 處理 modal 打開時鎖定滾動
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  // 格式化顯示資料
  const getFormattedData = useCallback(() => {
    if (!fullData) return [];

    return Object.entries(fullData)
      .filter(([key, value]) => {
        // 過濾掉不需要的欄位
        if (excludeFields.includes(key)) return false;
        // 過濾掉沒有對應中文標籤的欄位
        if (!fieldLabels[key]) return false;
        // 過濾掉 null、undefined、空字串
        if (value === null || value === undefined || value === "") return false;
        // 過濾掉空陣列
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      })
      .map(([key, value]) => ({
        label: fieldLabels[key],
        value: timeFields.includes(key)
          ? dayjs.unix(Number(value)).format("YYYY-MM-DD HH:mm")
          : value,
      }));
  }, [fullData]);

  const formattedData = useMemo(() => getFormattedData(), [getFormattedData]);

  return (
    <div
      className={`
      bg-white dark:bg-gray-800
      border-b border-gray-200 dark:border-gray-700
      px-1
      py-3
      ${className}
    `}
    >
      <div className="flex flex-col pr-1">
        <h3 className="text-xl font-bold text-[#1E1E1E] dark:text-white mb-1">
          {name}
        </h3>
        {address && (
          <div className="flex items-start gap-1 text-[#1E1E1E] dark:text-gray-200 mb-2">
            <span>{address}</span>
          </div>
        )}
        <div className="flex items-start gap-2 text-[#838383] dark:text-gray-400">
          <div className="font-medium w-10">類型</div>
          <div className="w-[290px]">{type || "未提供"}</div>
        </div>
        <div className="flex items-start gap-2 text-[#838383] dark:text-gray-400 mb-2">
          <div className="font-medium w-10">{hours ? "時段" : "資訊"}</div>
          <div className="w-[290px]">{hours ? hours : contact || "未提供"}</div>
        </div>
      </div>
      <div className="flex gap-2">
        {mapUrl && <ActionButton href={mapUrl}>導航</ActionButton>}
        {fullData && (
          <ActionButton
            variant="secondary"
            icon="/info.svg"
            onClick={() => setShowModal(true)}
          >
            查看資訊
          </ActionButton>
        )}
        {contact && (
          <ActionButton
            variant="secondary"
            icon="/call.svg"
            href={`tel:${contact}`}
          >
            立即聯絡
          </ActionButton>
        )}
      </div>

      {/* 彈窗 */}
      {showModal && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="fixed inset-0 z-50 flex items-end pointer-events-none">
            <div
              className="bg-white dark:bg-gray-800 rounded-t-2xl w-full max-h-[85vh] overflow-y-auto animate-slide-up shadow-lg pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start p-6 pb-4">
                <div className="px-3 py-1 bg-[#009688] dark:bg-teal-700 text-white text-sm rounded">
                  {type || "定點"}
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Title */}
              <div className="px-6 pb-4">
                <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">
                  {name}
                </h2>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 space-y-4">
                {formattedData.length > 0 ? (
                  formattedData.map(({ label, value }, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="text-[#838383] dark:text-gray-400 min-w-[80px] shrink-0 whitespace-nowrap">
                        {label}
                      </div>
                      <div className="text-[#1E1E1E] dark:text-gray-200 flex-1 break-words overflow-wrap-anywhere">
                        {Array.isArray(value) ? (
                          value.join("、")
                        ) : typeof value === "boolean" ? (
                          value ? (
                            "是"
                          ) : (
                            "否"
                          )
                        ) : typeof value === "object" && value !== null ? (
                          JSON.stringify(value, null, 2)
                        ) : label === "連結" || label === "網站" ? (
                          <a
                            href={String(value)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#009688] dark:text-teal-400 underline break-all"
                          >
                            {String(value)}
                          </a>
                        ) : (
                          String(value) || "未提供"
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600 dark:text-gray-400">
                    無詳細資料
                  </div>
                )}
              </div>

              {/* Footer Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-[#C96319] dark:bg-orange-700 text-white py-3 rounded-lg font-medium hover:bg-[#B55815] dark:hover:bg-orange-600 transition-colors"
                >
                  回報問題
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCard;
