"use client";

import { useEffect, useMemo, useRef, useState } from "react";
// import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// import {
//   SuppliesResponse,
//   //Supply, SupplyItem, SupplyProvider
// } from "@/lib/types";
// import { getSupplies } from "@/lib/api";

/**
 * RWD 物資站志工填單頁
 * - 需求列表改為從遠端 API 取得
 * - 以 offset 為分頁方式：0 第一頁、50 第二頁、100 第三頁…
 * - 僅已登入 LINE 的使用者可填，未登入顯示門擋頁
 */

// const PAGE_SIZE = 50;

// type NeedItem = { name: string; qty: number | string; unit: string };
// type Need = {
//   id: string;
//   title: string;
//   desc: string;
//   items: NeedItem[];
//   tags: string[];
// };

// type Supply = { id: string; name: string; qty: string; unit: string };

// 嘗試把不確定結構的 API 統一轉成 Need[]
// function normalizeApiToNeeds(payload: SuppliesResponse): Need[] {

//   return {
//     id: 
//   };

//   const arr: any[] = Array.isArray(payload)
//     ? payload
//     : Array.isArray(payload?.data)
//     ? payload.data
//     : Array.isArray(payload?.results)
//     ? payload.results
//     : [];

//   return arr.map((row, idx) => {
//     const id =
//       row.id?.toString?.() ??
//       row._id?.toString?.() ??
//       row.slug?.toString?.() ??
//       row.code?.toString?.() ??
//       String(idx);

//     const title = row.title ?? row.name ?? row.subject ?? `需求 ${id}`;
//     const desc =
//       row.desc ?? row.description ?? row.note ?? row.notes ?? row.summary ?? "";

//     const rawItems =
//       row.items ??
//       row.requirements ??
//       row.needs ??
//       row.detail ??
//       row.details ??
//       [];

//     const items: NeedItem[] = Array.isArray(rawItems)
//       ? rawItems.map((it: any) => {
//           const name = it.name ?? it.title ?? it.item ?? it.label ?? "未命名";
//           const qty = it.qty ?? it.quantity ?? it.count ?? it.num ?? "";
//           const unit = it.unit ?? it.uom ?? it.measure ?? "";
//           return { name, qty, unit };
//         })
//       : [];

//     const tagsSrc = row.tags ?? row.labels ?? row.categories ?? [];
//     const tags = Array.isArray(tagsSrc)
//       ? tagsSrc
//           .map((t: any) => (typeof t === "string" ? t : t?.name ?? ""))
//           .filter(Boolean)
//       : [];

//     return { id, title, desc, items, tags };
//   });
// }

// function normalizeApiToNeeds(payload: SuppliesResponse): Need[] {
//   // const needs = payload.member;
//   // const 
//   // needs.forEach(need => {
    
//   // });
//   console.log(payload.totalItems);

//   return [{id: "ID", title: "TITLE", desc: "DESC", items: [], tags: []}];
// }

export default function ReliefFormPage() {
  const router = useRouter();

  // ---- 登入門檻狀態 ----
  const [authChecked, setAuthChecked] = useState(false); // 是否檢查完 localStorage
  const [authed, setAuthed] = useState(false); // 是否已登入（依據 localStorage 是否有 line_oauth_state）
  // ---- 右側「可提供的物資」動態列 ----
  // const [supplies, setSupplies] = useState([
  //   { id: cryptoRandomId(), name: "", qty: "", unit: "" },
  // ]);

  // ---- 左側「需求清單」來自 API ----
  // const [needs, setNeeds] = useState<Need[]>([]);
  // const [offset, setOffset] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errMsg, setErrMsg] = useState<string | null>(null);
  // const [hasNext, setHasNext] = useState(false);
  // const abortRef = useRef<AbortController | null>(null);

  // const pageIndex = useMemo(() => Math.floor(offset / PAGE_SIZE) + 1, [offset]);

  // 進入頁面先檢查是否已登入（localStorage 有 line_oauth_state）
  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = !!localStorage.getItem("line_oauth_state");
    setAuthed(flag);
    setAuthChecked(true);
  }, []);

  // 只有已登入時才抓需求清單
  // useEffect(() => {
  //   if (!authed) return;

  //   abortRef.current?.abort();
  //   const ac = new AbortController();
  //   abortRef.current = ac;

  //   const fetchList = async () => {
  //     setIsLoading(true);
  //     setErrMsg(null);
  //     try {
  //       const resJson = await getSupplies(PAGE_SIZE, offset) ;
  //       const normalized = normalizeApiToNeeds(resJson);
  //       setNeeds(normalized);
  //       setHasNext(
  //         Array.isArray(normalized) && normalized.length === PAGE_SIZE
  //       );
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         if (err.name === "AbortError") return;
  //         setErrMsg(err.message);
  //       } else {
  //         setErrMsg("發生未知錯誤");
  //       }
  //       setNeeds([]);
  //       setHasNext(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchList();
  //   return () => ac.abort();
  // }, [offset, authed]);

  // const goPrev = () => setOffset((o) => Math.max(0, o - PAGE_SIZE));
  // const goNext = () => setOffset((o) => o + PAGE_SIZE);

  // 觸發 LINE SSO
  const startLineLogin = () => {
    if (typeof window === "undefined") return;

    // 可選：讓登入後能回到原頁面
    const next = encodeURIComponent(
      (window.location.pathname || "/") + (window.location.search || "")
    );

    // state 可用來攜帶 callback 或自訂資訊
    const state = encodeURIComponent(
      JSON.stringify({
        next,
      })
    );
    // 重新導向到你後端的 LINE OAuth 起始點
    window.location.href = `https://guangfu250923.pttapp.cc/auth/line/start?state=${encodeURIComponent(
      state
    )}&redirect_uri=${encodeURIComponent(
      `${window.location.origin}/auth/line/callback`
    )}`;
  };

  // 顯示「檢查中」骨架
  if (!authChecked) {
    return (
      <main className="min-h-dvh grid place-items-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="animate-pulse rounded-2xl border border-slate-200 bg-white px-6 py-4 text-slate-600 shadow-sm">
          正在檢查登入狀態…
        </div>
      </main>
    );
  }

  // 未登入：顯示門擋頁（登入 / 返回首頁）
  if (!authed) {
    return (
      <main className="min-h-dvh grid place-items-center bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold">需要先登入 LINE 才能填寫</h1>
          <p className="mt-2 text-sm text-slate-600">
            請先完成 LINE 登入後再回來此頁進行填寫。你也可以先返回首頁。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm hover:bg-slate-50"
              onClick={() => (window.location.href = "/")}
            >
              返回首頁
            </button>
            <button
              type="button"
              className="rounded-xl border-0 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              onClick={startLineLogin}
            >
              前往 LINE 登入
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 已登入：顯示原頁面
//   return (
//     <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
//       <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
//         {/* Header */}
//         <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
//               物資站志工填單頁面
//             </h1>
//             <p className="mt-1 text-sm text-slate-600">
//               請填寫物資站資訊與可提供的物資，送出後由系統彙整。
//             </p>
//           </div>

//           <div className="flex gap-2">
//             <button
//               disabled
//               type="button"
//               className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 active:scale-[0.99]"
//               onClick={() => alert("登入流程請串接 LINE / OAuth")}
//             >
//               已登入
//             </button>
//             <button
//               type="button"
//               className="rounded-2xl border border-transparent bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 active:scale-[0.99]"
//               onClick={() => {
//                 // 示意登出：清掉 localStorage 的登入旗標
//                 localStorage.removeItem("line_oauth_state");
//                 window.location.reload();
//               }}
//             >
//               登出
//             </button>
//           </div>
//         </div>

//         {/* Layout Grid */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//           {/* Left: 物資站基本資訊 + 需求清單 */}
//           <section aria-labelledby="station-info" className="space-y-6">
//             <Card>
//               <CardHeader id="station-info">物資站資訊</CardHeader>
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <Field
//                   label="物資站名稱"
//                   id="stationName"
//                   placeholder="例：光復里物資站"
//                 />
//                 <Field
//                   label="物資站電話"
//                   id="stationPhone"
//                   type="tel"
//                   placeholder="例：0912-345-678"
//                 />
//                 <Field
//                   label="物資站地址"
//                   id="stationAddress"
//                   className="sm:col-span-2"
//                   placeholder="例：花蓮縣光復鄉…"
//                 />
//               </div>
//             </Card>

//             <Card>
//               <div className="mb-3 flex items-center justify-between gap-3">
//                 <CardHeader>目前需求列表</CardHeader>
//                 {/* Pagination control */}
//                 <div className="flex items-center gap-2">
//                   <button
//                     type="button"
//                     className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50 disabled:opacity-50"
//                     onClick={goPrev}
//                     disabled={offset === 0 || isLoading}
//                     aria-label="上一頁"
//                   >
//                     ← 上一頁
//                   </button>
//                   <div className="min-w-[90px] text-center text-sm text-slate-600">
//                     第 <span className="font-semibold">{pageIndex}</span> 頁
//                   </div>
//                   <button
//                     type="button"
//                     className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50 disabled:opacity-50"
//                     onClick={goNext}
//                     disabled={!hasNext || isLoading}
//                     aria-label="下一頁"
//                   >
//                     下一頁 →
//                   </button>
//                 </div>
//               </div>

//               {isLoading && <ListSkeleton />}
//               {errMsg && (
//                 <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
//                   讀取失敗：{errMsg}
//                 </div>
//               )}

//               {!isLoading && !errMsg && (
//                 <>
//                   {needs.length === 0 ? (
//                     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
//                       這一頁目前沒有資料。
//                     </div>
//                   ) : (
//                     <ul className="space-y-4">
//                       {needs.map((n) => (
//                         <li key={n.id}>
//                           <NeedCard data={n} />
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </>
//               )}
//             </Card>
//           </section>

//           {/* Right: 可提供的物資 + 送出 */}
//           <section aria-labelledby="provide" className="space-y-6">
//             <Card>
//               <CardHeader id="provide">可提供的物資</CardHeader>

//               <div className="space-y-3">
//                 {supplies.map((row) => (
//                   <motion.div
//                     key={row.id}
//                     layout
//                     initial={{ opacity: 0, y: 6 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="grid grid-cols-1 gap-3 sm:grid-cols-12"
//                   >
//                     <Field
//                       label="物資名稱"
//                       id={`s-name-${row.id}`}
//                       placeholder="例：礦泉水"
//                       value={row.name}
//                       onChange={(v) =>
//                         updateSupply(row.id, { name: v }, supplies, setSupplies)
//                       }
//                       className="sm:col-span-6"
//                     />
//                     <Field
//                       label="數量"
//                       id={`s-qty-${row.id}`}
//                       type="number"
//                       inputMode="numeric"
//                       placeholder="例：10"
//                       value={row.qty}
//                       onChange={(v) =>
//                         updateSupply(row.id, { qty: v }, supplies, setSupplies)
//                       }
//                       className="sm:col-span-3"
//                     />
//                     <Field
//                       label="單位"
//                       id={`s-unit-${row.id}`}
//                       placeholder="例：箱 / 瓶 / 包"
//                       value={row.unit}
//                       onChange={(v) =>
//                         updateSupply(row.id, { unit: v }, supplies, setSupplies)
//                       }
//                       className="sm:col-span-3"
//                     />
//                   </motion.div>
//                 ))}

//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
//                     onClick={() =>
//                       setSupplies((s) => [
//                         ...s,
//                         { id: cryptoRandomId(), name: "", qty: "", unit: "" },
//                       ])
//                     }
//                     aria-label="新增一列物資"
//                   >
//                     <span className="text-lg leading-none">＋</span> 新增一列
//                   </button>
//                 </div>
//               </div>
//             </Card>

//             <Card>
//               <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-between">
//                 <button
//                   type="button"
//                   className="order-2 rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 sm:order-1"
//                   onClick={() => router.push("/")}
//                 >
//                   回首頁
//                 </button>

//                 <button
//                   type="button"
//                   className="order-1 rounded-2xl border-0 bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.99] sm:order-2"
//                   onClick={() => handleSubmit(supplies)}
//                 >
//                   送出
//                 </button>
//               </div>
//             </Card>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
}

// /** Helpers */
// function cryptoRandomId() {
//   if (typeof window !== "undefined" && "crypto" in window) {
//     return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
//   }
//   return Math.random().toString(36).slice(2);
// }

// function updateSupply(
//   id: string,
//   patch: Partial<{ name: string; qty: string; unit: string }>,
//   supplies: Supply[],
//   setSupplies: (updater: Supply[]) => void
// ) {
//   setSupplies(supplies.map((s) => (s.id === id ? { ...s, ...patch } : s)));
// }

// function handleSubmit(supplies: { name: string; qty: string; unit: string }[]) {
//   const hasInvalid = supplies.some((s) => !s.name || !s.qty);
//   if (hasInvalid) {
//     alert("請填寫物資名稱與數量");
//     return;
//   }
//   console.log("submit payload:", supplies);
//   alert("已送出（示意）\n詳情請串接後端 API。");
// }

// /** UI atoms */
// function Card({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//       {children}
//     </div>
//   );
// }

// function CardHeader({
//   children,
//   id,
// }: {
//   children: React.ReactNode;
//   id?: string;
// }) {
//   return (
//     <h2 id={id} className="mb-4 text-lg font-semibold tracking-tight">
//       {children}
//     </h2>
//   );
// }

// function Field({
//   label,
//   id,
//   className,
//   type = "text",
//   inputMode,
//   placeholder,
//   value,
//   onChange,
// }: {
//   label: string;
//   id: string;
//   className?: string;
//   type?: string;
//   inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
//   placeholder?: string;
//   value?: string;
//   onChange?: (v: string) => void;
// }) {
//   return (
//     <label className={`block ${className || ""}`} htmlFor={id}>
//       <span className="mb-1 block text-sm font-medium text-slate-700">
//         {label}
//       </span>
//       <input
//         id={id}
//         name={id}
//         type={type}
//         inputMode={inputMode}
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange?.(e.target.value)}
//         className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]"
//       />
//     </label>
//   );
// }

// function NeedCard({ data }: { data: Need }) {
//   return (
//     <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
//       <div className="mt-0.5">
//         <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
//           ✓
//         </span>
//       </div>
//       <div className="flex-1">
//         <div className="flex flex-wrap items-center justify-between gap-2">
//           <div className="text-base font-semibold">{data.title}</div>
//           <div className="flex gap-1">
//             {data.tags.map((t) => (
//               <span
//                 key={t}
//                 className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-600 ring-1 ring-slate-200"
//               >
//                 {t}
//               </span>
//             ))}
//           </div>
//         </div>
//         {data.desc && (
//           <p className="mt-1 text-sm text-slate-600">{data.desc}</p>
//         )}
//         <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
//           {data.items.map((it, i) => (
//             <li
//               key={i}
//               className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-slate-200"
//             >
//               <span className="truncate">{it.name}</span>
//               <span className="shrink-0 tabular-nums text-slate-700">
//                 {it.qty} {it.unit}
//               </span>
//             </li>
//           ))}
//         </ul>
//         <div className="mt-2 text-xs text-slate-500">ID - {data.id}</div>
//       </div>
//     </div>
//   );
// }

// function ListSkeleton() {
//   return (
//     <ul className="space-y-4">
//       {Array.from({ length: 4 }).map((_, i) => (
//         <li key={i} className="animate-pulse">
//           <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
//             <div className="mt-0.5">
//               <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-[10px] font-bold text-white"></span>
//             </div>
//             <div className="flex-1 space-y-2">
//               <div className="h-4 w-1/3 rounded bg-slate-200" />
//               <div className="h-3 w-3/4 rounded bg-slate-200" />
//               <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
//                 <div className="h-8 rounded bg-white ring-1 ring-slate-200" />
//                 <div className="h-8 rounded bg-white ring-1 ring-slate-200" />
//               </div>
//               <div className="h-3 w-24 rounded bg-slate-200" />
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
