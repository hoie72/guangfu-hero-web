import React from "react";
import Image from "next/image";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  href,
  className = "",
}) => {
  const buttonClasses = `
    h-[36px] py-2 px-3
    bg-[#009688] text-white
    rounded-lg
    cursor-pointer
    flex items-center gap-1
    whitespace-nowrap
    ${className}
  `;

  const icon = (
    <Image src="/nav.svg" alt="" width={20} height={20} className="invert" />
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
      {icon}
    </button>
  );
};

export default ActionButton;
