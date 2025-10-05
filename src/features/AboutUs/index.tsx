"use client";

import TeamGroup from "@/components/TeamGroup";

export default function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      groupName: "網站更新組",
      personNames: [
        "王璟恆",
        "Zack",
        "audery1011",
        "施宇",
        "強森",
        "破破popo",
        "WilliamTai",
        "Abby Su",
        "Yi",
        "Stephanie Sung",
        "Sam",
        "JessZhong",
        "Pink Li",
        "ppqq",
        "Yukay",
        "彭一珍",
        "陳亭妏",
        "Wenny Chang",
        "謝靖雯",
      ],
    },
    {
      id: 2,
      groupName: "宣傳組",
      personNames: ["于涵", "魏綺萱", "FANG JOU", "Sunny Yang"],
    },
    {
      id: 3,
      groupName: "地圖組",
      personNames: ["Zack", "張容瑜", "Zeli", "Fannie", "雅"],
    },
    {
      id: 4,
      groupName: "設計組",
      personNames: [
        "Vita",
        "葉彥均 Andy",
        "Pichu",
        "瑜瑜",
        "Sunny Yang",
        "JessZhong",
        "Yuling",
      ],
    },
    {
      id: 5,
      groupName: "DC管理組",
      personNames: [
        "JessZhong",
        "瑜瑜",
        "Andrew Yen",
        "Sunny Yang",
        "Tobie 偷偷",
      ],
    },
    {
      id: 6,
      groupName: "Line社群組 & 官方組",
      personNames: ["于涵", "施宇(鯊魚)"],
    },
    {
      id: 7,
      groupName: "廣宣組",
      personNames: ["Sunny Yang", "Yukay", "Jocelyn", "Andrew Yen"],
    },
    {
      id: 8,
      groupName: "核實組",
      personNames: ["出包", "雅"],
    },
    {
      id: 9,
      groupName: "公關組",
      personNames: ["捲捲 FANG JOU", "Andrew Yen"],
    },
  ];

  return (
    <div className="space-y-12 mb-[22px]">
      <section className="space-y-[22px]">
        <header className="h-[38px] py-2 px-2 text-[28px] font-medium text-[#1E1E1E] text-center">
          關於我們
        </header>
        <div className="text-[16px] leading-[20px] text-[#1E1E1E]">
          <p className="mb-4">
            當臺灣遭遇天災時，世界各地的人們都伸出援手，希望災民能儘快恢復生活。但現場資源混亂，善意的支援有時難以送達真正需要的人。
          </p>
          <p className="mb-4">
            因此，我們建立「資源整合平台」，讓每一份善意都能被有效運用。這個構想一提出，就吸引了來自各地、懷抱同樣信念的夥伴，一起投入開發與協作。
          </p>
          <p className="mb-4">
            面對災區變動的需求，團隊日夜接力開發、即時更新資訊。我們深知，最難的不是技術，而是確保資訊能隨時準確地反映現場狀況。
          </p>
          <p className="mb-4">
            這不僅是一場救援，更是一場長期行動。唯有集中整合，資源才能發揮最大效益。
          </p>
          <p className="mb-4">
            誠摯邀請更多「超人」加入，讓資訊更完整，讓需要幫助的人不必再四處尋找
            ——
          </p>
          <p className="mb-4 text-[28px] leading-[40px] text-center text-[var(--primary)] font-bold">
            只要來這裡，
            <br className="sm:hidden" />
            就能找到所需一切！
          </p>
        </div>
      </section>

      <section className="space-y-[22px]">
        <header className="h-[38px] py-2 px-2 text-[28px] font-medium text-[#1E1E1E] text-center">
          團隊成員
        </header>
        <div className="text-[16px] leading-[20px] text-[#1E1E1E]">
          感謝所有為了讓系統能全天運作、資訊不中斷而付出的每一位「接力超人」！
        </div>

        <div className="space-y-[10px]">
          {teamMembers.map((member) => (
            <TeamGroup
              key={member.id}
              groupName={member.groupName}
              personNames={member.personNames}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
