"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LineLocalCallback() {
  const sp = useSearchParams();
  const router = useRouter();
  const [msg, setMsg] = useState("處理中…");

  useEffect(() => {
    const code = sp.get("code");
    const state = sp.get("state");
    if (!code) {
      setMsg("缺少 code");
      return;
    }

    (async () => {
      try {
        // 丟給你自己的本機 API（server route）去打 guangfu 的 /auth/line/token
        const res = await fetch("/api/line/exchange", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ code, state }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Exchange failed: ${res.status}`);
        }

        // 若本機 API 已經設好 session cookie，就直接導向你要的頁
        router.replace("/map");
      } catch (e: any) {
        setMsg(`LINE 登入失敗：${e.message ?? e}`);
      }
    })();
  }, [sp, router]);

  return <p>{msg}</p>;
}
