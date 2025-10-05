"use client";

import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import TeamGroup from "@/components/TeamGroup";

export default function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      groupName: "資訊審核小組",
      personNames: ["小明", "小華", "大雄", "小芳", "志明", "淑芬", "建國", "雅婷", "文傑", "慧君"],
    },
    {
      id: 2,
      groupName: "網站組",
      personNames: ["小明", "小華", "大雄", "小芳", "志明", "淑芬", "建國", "雅婷", "文傑", "慧君"],
    },
    {
      id: 3,
      groupName: "設計與宣傳組",
      personNames: ["小明", "小華", "大雄", "小芳", "志明", "淑芬", "建國", "雅婷", "文傑", "慧君"],
    },
  ];

  return (
    <div className="space-y-12 mb-[22px]">
      <section className="space-y-[22px]">
        <header className="h-[38px] py-1 px-2 rounded-lg bg-[#F9E6C0] text-[20px] font-medium text-[#1E1E1E] text-center">關於我們</header>
        <div className="text-[16px] leading-[20px] text-[#1E1E1E]">
          <p className="mb-4 sm:indent-0 md:indent-0 lg:indent-0 xl:indent-0 indent-8">
            當臺灣遭遇天災時，世界各地的人們都伸出援手，希望災民能儘快恢復生活。但現場資源混亂，善意的支援有時難以送達真正需要的人。
          </p>
          <p className="mb-4 sm:indent-0 md:indent-0 lg:indent-0 xl:indent-0 indent-8">
            因此，我們建立「資源整合平台」，讓每一份善意都能被有效運用。這個構想一提出，就吸引了來自各地、懷抱同樣信念的夥伴，一起投入開發與協作。
          </p>
          <p className="mb-4 sm:indent-0 md:indent-0 lg:indent-0 xl:indent-0 indent-8">
            面對災區變動的需求，團隊日夜接力開發、即時更新資訊。我們深知，最難的不是技術，而是確保資訊能隨時準確地反映現場狀況。
          </p>
          <p className="mb-4 sm:indent-0 md:indent-0 lg:indent-0 xl:indent-0 indent-8">
            這不僅是一場救援，更是一場長期行動。唯有集中整合，資源才能發揮最大效益。
          </p>
          <p className="mb-4 sm:indent-0 md:indent-0 lg:indent-0 xl:indent-0 indent-8">
            誠摯邀請更多「超人」加入，讓資訊更完整，讓需要幫助的人不必再四處尋找———
          </p>
          <p className="mb-4 text-[32px] leading-[40px] text-center text-[#C96319]">  
            只要來這裡，<br className="sm:hidden" />
            就能找到所需一切！      
          </p>
        </div>
      </section>
      
      <section className="space-y-[22px]">
        <header className="h-[38px] py-1 px-2 rounded-lg bg-[#F9E6C0] text-[20px] font-medium text-[#1E1E1E] text-center">團隊成員</header>
        <div className="text-[16px] leading-[20px] text-[#1E1E1E]">
          感謝所有為了讓系統能全天運作、資訊不中斷而付出的每一位「接力超人」！
        </div>
        
        <div className="space-y-[10px]">
          {teamMembers.map((member) => (
            <TeamGroup key={member.id} groupName={member.groupName} personNames={member.personNames} />
          ))}
        </div>
      </section>
    </div>
  );
}
