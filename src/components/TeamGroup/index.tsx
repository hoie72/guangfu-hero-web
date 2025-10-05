import React from "react";

interface TeamGroupProps {
  groupName: string;
  personNames: string[];
}

const TeamGroup: React.FC<TeamGroupProps> = ({ groupName, personNames }) => {
  return (
    <div className="bg-gray-100 rounded-lg px-5 py-3">
      {/* 標題 */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-black">{groupName}</h3>
      </div>
      
      {/* 虛線框內容 */}
      <div className="border-2 border-dashed border-[#8A38F5] rounded-[5px] px-5 py-3">
        <div className="columns-2 gap-4 space-y-2 text-center">
          {personNames.map((name, index) => (
            <div key={index} className="text-black break-inside-avoid">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamGroup;
