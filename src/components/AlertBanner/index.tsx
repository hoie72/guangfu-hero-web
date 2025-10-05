"use client";

import { useState, useEffect } from "react";

const alerts = [
  "現場隨時有溢流風險，點此詳讀避難守則警報響起請往高處避難",
  "請注意個人安全，結伴同行更安全",
  "保持聯繫，手機保持電量",
];

interface AlertBannerProps {
  onAlertClick: () => void;
}

export default function AlertBanner({ onAlertClick }: AlertBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % alerts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div
        className="bg-[#FFEEBA] dark:bg-yellow-900/50 h-[64px] flex items-center justify-center cursor-pointer hover:bg-[#FFE5A0] dark:hover:bg-yellow-900/60 transition-colors"
        onClick={onAlertClick}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-[var(--text-black)] dark:text-yellow-100 font-medium">
            {alerts[currentSlide]}
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 py-2 bg-white dark:bg-gray-900">
        {alerts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-[6px] h-[6px] rounded-full transition-colors ${
              index === currentSlide
                ? "bg-[var(--gray-2)] dark:bg-gray-300"
                : "bg-[var(--gray-3)] dark:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
