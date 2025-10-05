"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
  [key: string]: unknown;
}

interface DropdownSelectProps {
  value: string;
  onChange: (newValue: string) => void;
  options: Option[];
}

export default function DropdownSelect({
  value: valueProp,
  onChange,
  options,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find((opt) => opt.value === valueProp)?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-1 px-3 py-2 w-max bg-[#F4F4F5] rounded-md dark:bg-gray-800 dark:text-gray-100"
      >
        <span>{selectedLabel}</span>
        <Image
          src={
            open
              ? getAssetPath("/chevron_up.svg")
              : getAssetPath("/chevron_down.svg")
          }
          alt="up"
          width={11}
          height={6.5}
        />
      </button>

      {open && (
        <div className="absolute left-0 z-10 mt-1 bg-[#F4F4F5] rounded-md dark:bg-gray-800">
          {options.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => {
                console.log("ttt");
                onChange(value);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-gray-100 ${
                value === valueProp && "bg-[#e6e6e9]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
