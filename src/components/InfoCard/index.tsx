import React from "react";
import Image from "next/image";
import ActionButton from "@/components/ActionButton";

interface InfoCardProps {
  name: string;
  address?: string;
  contact?: string;
  mapUrl?: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  name,
  address,
  contact,
  mapUrl,
  className = "",
}) => {
  return (
    <div
      className={`
      bg-white
      border-b border-gray-200
      px-3
      py-4
      flex justify-between
      ${className}
    `}
    >
      <div className="flex flex-col pr-1">
        <h3 className="text-lg font-bold text-[#1E1E1E] mb-2">{name}</h3>

        {address && (
          <div className="flex items-start gap-1 text-sm text-[#1E1E1E] mb-1">
            <Image
              src="/location.svg"
              alt=""
              width={17}
              height={17}
              className="flex-shrink-0 mt-0.5"
            />
            <span>{address}</span>
          </div>
        )}

        {contact && (
          <div className="flex items-start gap-1 text-sm text-[#1E1E1E]">
            <Image
              src="/call.svg"
              alt=""
              width={17}
              height={17}
              className="flex-shrink-0 mt-0.5"
            />
            <span>{contact}</span>
          </div>
        )}
      </div>

      {mapUrl && (
        <div className="flex">
          <ActionButton href={mapUrl}>前往</ActionButton>
        </div>
      )}
    </div>
  );
};

export default InfoCard;
