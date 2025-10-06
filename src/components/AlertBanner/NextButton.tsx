"use client";
import React from "react";

interface NextButtonProps {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  next: () => void;
}
const NextButton = ({ setIsPaused, next }: NextButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setIsPaused(true);
        next();
      }}
<<<<<<< HEAD
      className="hidden sm:inline-flex items-center justify-center w-8 h-8 ml-2 rounded-full text-[var(--text-black)] focus:outline-none focus:ring-2 focus:ring-yellow-600"
=======
      className="hidden sm:inline-flex items-center justify-center w-8 h-8 ml-2 rounded-full text-[var(--text-black)] dark:text-yellow-100 hover:bg-black/5 dark:hover:bg-yellow-100/10 focus:outline-none focus:ring-2 focus:ring-yellow-600"
>>>>>>> main
      aria-label="下一則警示"
    >
      <span aria-hidden>›</span>
    </button>
  );
};

export default NextButton;
