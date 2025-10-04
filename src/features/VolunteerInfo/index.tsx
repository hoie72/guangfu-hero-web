"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
import ClothingProtectionChecklist from "@/features/VolunteerInfo/ClothingProtectionChecklist";
import FootwearHandsChecklist from "@/features/VolunteerInfo/FootwearHandsChecklist";
import MedicalItemsChecklist from "@/features/VolunteerInfo/MedicalItemsChecklist";
import FoodSuppliesChecklist from "@/features/VolunteerInfo/FoodSuppliesChecklist";
import DisasterReliefToolsChecklist from "@/features/VolunteerInfo/DisasterReliefToolsChecklist";
import OtherEssentialChecklist from "./OtherEssentialChecklistProps";
import { getAssetPath } from "@/lib/utils";

type InfoCategory = "行前必讀" | "交通資訊" | "住宿資訊";
type TransportMode = "大眾運輸" | "共乘資訊";

export interface ChecklistItemData {
  id: string;
  label: string;
  description?: string | string[];
  highlight?: boolean;
}

interface VolunteerInfoProps {
  initialCategory?: InfoCategory;
}

export default function VolunteerInfo({ initialCategory = "行前必讀" }: VolunteerInfoProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<InfoCategory>(initialCategory);
  const [selectedTransportMode, setSelectedTransportMode] =
    useState<TransportMode>("大眾運輸");

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const categories: InfoCategory[] = ["行前必讀", "交通資訊", "住宿資訊"];

  const handleCategoryClick = (category: InfoCategory) => {
    if (category === "住宿資訊") {
      router.push("/map?view=list");
    } else if (category === "行前必讀") {
      router.push("/volunteer/preparation");
    } else if (category === "交通資訊") {
      router.push("/volunteer/transportation");
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div>
      {/* 按鈕列表 - 支援橫向滾動 */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-3 mb-6 min-w-max">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryClick(category)}
              active={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* 內容區域 */}
      <div className="space-y-4">
        {selectedCategory === "行前必讀" && (
          <div className="space-y-4">
            <h3 className="font-bold text-xl ">一、如何加入志工</h3>
            <Accordion title="確認資訊" icon="🔍">
              <p>查詢災區天氣、交通、人力需求等，評估自身情況</p>
            </Accordion>

            <Accordion title="加入志工" icon="📝">
              <p>加入個人志工 / 團隊志工 說明？</p>
            </Accordion>

            <Accordion title="行前準備" icon="🎒">
              <p>確認交通資訊、裝備（下滑有裝備清單）</p>
            </Accordion>

            <Accordion title="出發光復" icon="🚗">
              <p>切勿開車進入光復！ 買好回程車票，避免向隅</p>
            </Accordion>

            <Accordion title="進入災區" icon="⚠️">
              <p>抵達光復後，尋找聯絡人，帶你抵達災區目的地</p>
            </Accordion>

            <Accordion title="替換衣物再離開" icon="👕">
              <p>丟棄髒衣物，避免感染，也不造成他人困擾</p>
            </Accordion>

            {/* 裝備清單 */}
            <div className="mt-8">
              <div className="space-y-3">
                <h3 className="font-bold text-xl ">二、裝備清單</h3>
                <div className="bg-[#f1f1f1] rounded-lg p-6 space-y-6">
                  <ClothingProtectionChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-[#f1f1f1] rounded-lg p-6 space-y-6">
                  <FootwearHandsChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-[#f1f1f1] rounded-lg p-6 space-y-6">
                  <MedicalItemsChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-[#f1f1f1] rounded-lg p-6 space-y-6">
                  <FoodSuppliesChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-[#f1f1f1] rounded-lg p-6 space-y-6">
                  <DisasterReliefToolsChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
                <div className="bg-[#f1f1f1] rounded-lg p-6 space-y-6">
                  <OtherEssentialChecklist
                    checkedItems={checkedItems}
                    onCheckChange={handleCheckboxChange}
                  />
                </div>
              </div>
            </div>

            {/* 專才志工識別證 */}
            <div className="mt-8">
              <h3 className="font-bold text-xl mb-3">三、專才志工識別證</h3>
              <div className="bg-white">
                <p className="mb-4">
                  別上志工專才辨識證，讓大家一眼就能快速辨識你的專業能力，立馬派遣上工，成為災區即時戰力。
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <a
                    href="https://drive.google.com/drive/folders/15D92UyiEKYKZInl1l0IAbFeKDOQRSfj1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#009688] underline"
                  >
                    點此於 Google Drive 下載
                  </a>
                  ，或以下方 QR code 至 711 掃描列印
                </p>
                <div className="w-full">
                  <Image
                    src={getAssetPath("/id_card.svg")}
                    alt="專才志工識別證"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* 車輛辨識卡 */}
            <div className="mt-8">
              <h3 className="font-bold text-xl mb-3">四、車輛辨識卡</h3>
              <div className="w-full flex flex-col gap-2">
                <Image
                  src={getAssetPath("/car_card.svg")}
                  alt="車輛辨識卡"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
                <Image
                  src={getAssetPath("/car_card_1.svg")}
                  alt="車輛辨識卡1"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
                <Image
                  src={getAssetPath("/car_card_2.svg")}
                  alt="車輛辨識卡2"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
                <Image
                  src={getAssetPath("/car_card_3.svg")}
                  alt="車輛辨識卡3"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "交通資訊" && (
          <div className="space-y-6 mb-5">
            <div className="bg-[#C96319] text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">把路留給救災的重機！</h2>
              <p className="leading-relaxed">
                花蓮光復鄉正全力進行災後重建，台鐵已加開班次，以確保充足運能。一起搭乘大眾運輸，以保存體力，把力量留到最關鍵的時刻！如真的需要自駕，請盡可能共乘，讓我們一起將道路讓給救災重機！
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                active={selectedTransportMode === "大眾運輸"}
                onClick={() => setSelectedTransportMode("大眾運輸")}
              >
                大眾運輸
              </Button>
              <Button
                active={selectedTransportMode === "共乘資訊"}
                onClick={() => setSelectedTransportMode("共乘資訊")}
              >
                共乘資訊
              </Button>
            </div>

            {selectedTransportMode === "大眾運輸" && (
              <>
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    一、如何到花蓮：台鐵
                  </h3>
                  <p className="text-gray-700 mb-2">列車班次查詢看</p>
                  <a href="#" className="text-[#009688] underline text-sm">
                    訂票來這邊
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">
                    二、如何從花蓮到災區
                  </h3>

                  <div>
                    <div className="bg-[#FFF4E6] p-4 rounded-lg mb-4">
                      <p className="text-center font-bold text-lg mb-2">
                        交通部觀光署接駁車
                      </p>
                      <p className="text-center text-sm">
                        公路局每日服務專車：
                        <br />
                        07:00-10:00、16:00-20:00
                        <br />
                        每小時一班
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={getAssetPath("/station_1.svg")}
                          alt="花蓮車站 A"
                          width={200}
                          height={300}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={getAssetPath("/station_2.svg")}
                          alt="花蓮車站 B"
                          width={200}
                          height={300}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 space-y-2 mb-4">
                      <p>
                        ※專車路線往返新城｜花蓮｜吉安｜壽豐｜玉里等站與志工住宿地點。
                      </p>
                      <p>※車站與專車皆有識別圖卡，方便快速找到搭乘位置。</p>
                      <p>
                        ※班次將依需求與災區復原狀況隨時調整，確保交通不中斷。
                      </p>
                    </div>
                    <div className="mb-4">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdwVGwgGZ_Iba-fCJwk5A4rLLm8ENyz9M-STB-HNpFr5M3YiQ/viewform?fbclid=IwY2xjawNGzg9leHRuA2FlbQIxMABicmlkETFtUlBuYXVJS0lXemdDT1kzAR4UUp1JZ2neRSl1RUDteTEB07qBAiMvHs3ezjAPxpAB1gAMd0o_d-UtDiH2tw_aem_3r-MScFE-cteIhIaUR18_Q"
                        className="font-bold underline text-sm"
                      >
                        點此看官方公告
                      </a>
                      <p className="text-sm text-gray-600">
                        *交通部可能依現場狀況調整班次間距，請隨時留意官方公告。
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="bg-[#FFF4E6] p-4 rounded-lg mb-4 gap-2">
                      <div className="flex flex-col gap-1">
                        <p className="text-center font-bold text-lg mb-2">
                          尋找小蜜蜂接駁
                        </p>
                        <p className=" ">
                          車站周邊目前已由政府、軍方接手，以重機為主力投入救援。然而，偏遠的村落還需要鏟子超人們的支援！小蜜蜂超人已準備好，帶著鏟子超人們，一起前往需要幫助的地方！
                        </p>
                        <p className="text-[#C96319]">
                          注意：無論獨行或加入任何團體救災，請務必注意自身安全
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f1f1f1] rounded-lg p-6 space-y-6">
                    <div className="flex gap-2">
                      <div className="w-70 font-bold">
                        車站前小蜜蜂臨時泊車點
                        <br />
                        （無固定位置）
                      </div>
                      <p className="text-[#838383]">
                        出車站後，跟著現場的招牌指引就能找到！救災需求千變萬化，泊車點也跟著滾動調整，因此無確切地址。
                      </p>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={getAssetPath("/sign.svg")}
                        alt="sign"
                        width={200}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="w-70 font-bold">
                        慈濟志工社群
                        <br />
                        <a
                          className="border-b"
                          href="https://line.me/ti/g2/gNNwamqenP9lV5jJHFVvIC2SYJOWrPbwJNMLXA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                        >
                          加入 Line@
                        </a>
                      </div>
                      <p className="text-[#838383]">
                        由慈濟組織的志工社群，可依指示至記事本了解群內運作模式。
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-70 font-bold">
                        動森島民
                        <br />
                        <a
                          className="border-b"
                          href="https://line.me/ti/g2/RBQui9B01TU9u5fnru_3KCS9J4BuvZInmkO7DA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                        >
                          加入 Line@
                        </a>
                      </div>
                      <p className="text-[#838383]">
                        由當地災民自行組織，可依指示至記事本了解群內運作模式。
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-70 font-bold">
                        動森島民
                        <br />
                        <a
                          className="border-b"
                          href="https://line.me/ti/g2/RBQui9B01TU9u5fnru_3KCS9J4BuvZInmkO7DA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                        >
                          加入 Line@
                        </a>
                      </div>
                      <p className="text-[#838383]">
                        由當地災民自行組織，可依指示至記事本了解群內運作模式。
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-70 font-bold">
                        花蓮救災-大部隊不去的地方
                        <br />
                        <a
                          className="border-b"
                          href="https://line.me/ti/g2/xFQQW0R_NpxuFQ2diepCNKrqzYne-lqMLolknQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                        >
                          加入 Line@
                        </a>
                      </div>
                      <p className="text-[#838383]">
                        由熱心超人組織，可依指示至記事本了解群內運作模式。
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-70 font-bold">
                        出發阿陶莫
                        <br />
                        <a className="border-b" href="#">
                          加入 Line@
                        </a>
                      </div>
                      <p className="text-[#838383]">
                        由熱心超人組織，可依指示至記事本了解群內運作模式。
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedTransportMode === "共乘資訊" && (
              <div className="space-y-4">
                <div className="bg-[#C96319] text-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-center">
                    ！請勿開車進入光復！
                  </h2>
                </div>
                <div>
                  <div className="bg-[#f1f1f1] rounded-lg p-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col w-1/2">
                        <div className="bg-[#F9E6C0] rounded py-1 px-2 font-bold mb-2">
                          南下路線
                        </div>
                        <div>請停在花蓮火車站，改搭區間車往光復。</div>
                      </div>
                      <div className="flex flex-col w-1/2">
                        <div className="bg-[#F9E6C0] rounded py-1 px-2 font-bold mb-2">
                          北上路線
                        </div>
                        <div>請停在鳳林火車站，改搭區間車往光復。</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden my-4">
                    <Image
                      src={getAssetPath("alt_road.svg")}
                      alt="alt-road"
                      width={200}
                      height={300}
                      className="w-full h-auto"
                    />
                    <div className="text-xl text-[#434343] my-2 text-center">
                      資料來源：2025/09/26 花蓮縣政府公告
                    </div>
                  </div>

                  <div className="bg-[#FFF4E6] m-2 rounded-lg mb-4">
                    <p className="text-center font-bold text-lg mb-2">
                      各區共乘資訊
                    </p>
                  </div>
                  <p className="text-[#C96319]">
                    注意：無論獨行或加入任何團體救災，請務必注意自身安全
                  </p>
                  <p className="text-center">光復救災 北區共乘</p>
                  <p className="text-center">光復救災 中區共乘</p>
                  <p className="text-center">光復救災 南區共乘</p>
                </div>
              </div>
            )}
          </div>
        )}
        {selectedCategory === "住宿資訊" && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">住宿資訊</h2>
            <p className="text-gray-600">住宿資訊的內容將顯示在這裡</p>
          </div>
        )}
      </div>
    </div>
  );
}
