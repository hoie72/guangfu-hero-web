"use client";

import { useState, useEffect } from "react";
import CarouselIndicators from "./CarouselIndicators";
import { useDrag } from "@/hooks/useDrag";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";

// 將簡單字串改為含有行為屬性的物件，便於控制哪些訊息可點擊
const alerts = [
  {
    text: "近期地震導致壩體狀況不穩定，請確認已無風險後再進入災區 <光復鄉、鳳林鎮、萬榮鄉>",
    actionable: false,
  },
  {
    text: "現場隨時有溢流風險，點此詳讀避難守則警報響起請往高處避難",
    actionable: true,
  },
  {
    text: "多補水防中暑！如不慎受傷，請前往醫療站處置。下水道作業慎防沼氣，請勿點火！",
    actionable: false,
  },
  { text: "請注意個人安全，結伴同行更安全", actionable: false },
  { text: "保持聯繫，手機保持電量", actionable: false },
];

interface AlertBannerProps {
  onAlertClick: () => void;
}

export default function AlertBanner({ onAlertClick }: AlertBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // 手動互動或 hover 時暫停輪播

  useEffect(() => {
    if (isPaused) return; // 暫停時不啟動計時器
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentInfo = alerts[currentSlide];

  const next = () => setCurrentSlide((prev) => (prev + 1) % alerts.length);
  const prev = () =>
    setCurrentSlide((prev) => (prev - 1 + alerts.length) % alerts.length);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowRight") {
      setIsPaused(true);
      next();
    } else if (e.key === "ArrowLeft") {
      setIsPaused(true);
      prev();
    } else if (e.key === "Enter" || e.key === " ") {
      if (currentInfo.actionable) {
        onAlertClick();
      }
    }
  };

  // Use drag hook for swipe/drag navigation
  const { isDragging, dragHandlers } = useDrag({
    onSwipeLeft: next,
    onSwipeRight: prev,
    onDragStart: () => setIsPaused(true),
    onDragEnd: () => setIsPaused(false),
  });

  return (
    <div>
      <div
        className={`bg-[#FFEEBA] h-[64px] flex items-center justify-center cursor-pointer hover:bg-[#FFE5A0] transition-colors ${
          currentInfo.actionable
            ? "cursor-pointer hover:bg-[#FFE5A0]"
            : "cursor-default"
        } ${isDragging ? "select-none" : ""}`}
        onClick={() => currentInfo.actionable && onAlertClick()}
        role={currentInfo.actionable ? "button" : undefined}
        aria-pressed={currentInfo.actionable ? false : undefined}
        aria-disabled={!currentInfo.actionable || undefined}
        aria-roledescription="carousel"
        aria-label="警示輪播"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        {...dragHandlers}
      >
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full select-none">
          <PrevButton setIsPaused={setIsPaused} prev={prev} />
          <div className="flex-1 text-center text-[var(--text-black)] font-medium ">
            {currentInfo.text}
            {!currentInfo.actionable && (
              <span className="sr-only">（此訊息不可點擊）</span>
            )}
          </div>
          <NextButton setIsPaused={setIsPaused} next={next} />
        </div>
      </div>
      <CarouselIndicators
        alerts={alerts}
        setCurrentSlide={setCurrentSlide}
        setIsPaused={setIsPaused}
        currentSlide={currentSlide}
      />
    </div>
  );
}