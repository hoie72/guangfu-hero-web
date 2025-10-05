import React from "react";

interface TabProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const Tab: React.FC<TabProps> = ({
  children,
  active = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        font-medium
        cursor-pointer
        transition-colors
        border-b-4
        ${
          active
            ? "border-[var(--primary)] dark:border-orange-500 text-[var(--primary)] dark:text-orange-400"
            : "border-transparent text-[var(--text-black)] dark:text-gray-200"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Tab;
