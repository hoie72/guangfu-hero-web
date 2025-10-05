// "use client";

// import { useState, useEffect } from "react";

// const alerts = [
//   "現場隨時有溢流風險，點此詳讀避難守則警報響起請往高處避難",
//   "請注意個人安全，結伴同行更安全",
//   "保持聯繫，手機保持電量",
// ];

// interface AlertBannerProps {
//   onAlertClick: () => void;
// }

// export default function AlertBanner({ onAlertClick }: AlertBannerProps) {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % alerts.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div>
//       <div
//         className="bg-[#FFEEBA] dark:bg-yellow-900/50 h-[64px] flex items-center justify-center cursor-pointer hover:bg-[#FFE5A0] dark:hover:bg-yellow-900/60 transition-colors"
//         onClick={onAlertClick}
//       >
//         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center text-[var(--text-black)] dark:text-yellow-100 font-medium">
//             {alerts[currentSlide]}
//           </div>
//         </div>
//       </div>

//       {/* Carousel Indicators */}
//       <div className="flex justify-center gap-2 py-2 bg-white dark:bg-gray-900">
//         {alerts.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`w-[6px] h-[6px] rounded-full transition-colors ${
//               index === currentSlide
//                 ? "bg-[var(--gray-2)] dark:bg-gray-300"
//                 : "bg-[var(--gray-3)] dark:bg-gray-600"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";

// 將簡單字串改為含有行為屬性的物件，便於控制哪些訊息可點擊
const alerts = [
  {
    text: "現場隨時有溢流風險，點此詳讀避難守則警報響起請往高處避難",
    actionable: true,
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

  const current = alerts[currentSlide];

  const handleClick = () => {
    if (current.actionable) {
      onAlertClick();
    }
  };

  const goTo = (index: number) => {
    setCurrentSlide((index + alerts.length) % alerts.length);
  };

  const next = () => {
    goTo(currentSlide + 1);
  };

  const prev = () => {
    goTo(currentSlide - 1);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowRight") {
      setIsPaused(true);
      next();
    } else if (e.key === "ArrowLeft") {
      setIsPaused(true);
      prev();
    } else if (e.key === "Enter" || e.key === " ") {
      if (current.actionable) {
        onAlertClick();
      }
    }
  };

  return (
    <div>
      <div
        className={`bg-[#FFEEBA] dark:bg-yellow-900/50 h-[64px] flex items-center justify-center cursor-pointer hover:bg-[#FFE5A0] dark:hover:bg-yellow-900/60 transition-colors ${
          current.actionable
            ? "cursor-pointer hover:bg-[#FFE5A0] dark:hover:bg-yellow-900/60"
            : "cursor-default"
        }`}
        onClick={handleClick}
        role={current.actionable ? "button" : undefined}
        aria-pressed={current.actionable ? false : undefined}
        aria-disabled={!current.actionable || undefined}
        aria-roledescription="carousel"
        aria-label="警示輪播"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full select-none">
          {/* Prev 按鈕 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused(true);
              prev();
            }}
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 mr-2 rounded-full text-[var(--text-black)] dark:text-yellow-100 hover:bg-black/5 dark:hover:bg-yellow-100/10 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            aria-label="上一則警示"
          >
            <span aria-hidden>‹</span>
          </button>

          <div className="flex-1 text-center text-[var(--text-black)] dark:text-yellow-100 font-medium ">
            {current.text}
            {!current.actionable && (
              <span className="sr-only">（此訊息不可點擊）</span>
            )}
          </div>

          {/* Next 按鈕 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused(true);
              next();
            }}
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 ml-2 rounded-full text-[var(--text-black)] dark:text-yellow-100 hover:bg-black/5 dark:hover:bg-yellow-100/10 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            aria-label="下一則警示"
          >
            <span aria-hidden>›</span>
          </button>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 py-2 bg-white dark:bg-gray-900">
        {alerts.map((alert, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsPaused(true);
            }}
            className={`w-[6px] h-[6px] rounded-full transition-colors ${
              index === currentSlide
                ? "bg-[var(--gray-2)]"
                : "bg-[var(--gray-3)]"
            }`}
            aria-label={`跳到第 ${index + 1} 則警示：${alert.text}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </div>
  );
}
