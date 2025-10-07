"use client";

import { useEffect } from "react";
import ReactGA from "react-ga4";
import { env } from "@/config/env";

export function GoogleAnalytics() {
  useEffect(() => {
    ReactGA.initialize(env.NEXT_PUBLIC_GA4_ID);
  }, []);
  return null;
}
