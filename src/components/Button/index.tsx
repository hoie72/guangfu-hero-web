import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "sub";
}

const Button: React.FC<ButtonProps> = ({
  children,
  active = false,
  onClick,
  className = "",
  variant = "default",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        border rounded-lg
        bg-white dark:bg-gray-800
        cursor-pointer
        whitespace-nowrap
        ${variant === "sub" ? "text-sm h-[36px] px-3" : "h-[44px] px-4"}
        ${
          active
            ? "border-2 font-medium border-[#C96319] dark:border-orange-500 text-[#C96319] dark:text-orange-400"
            : "border-[#838383] dark:border-gray-600 text-[#838383] dark:text-gray-400"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
