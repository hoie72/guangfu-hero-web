import { Metadata } from "next";
import Wrapper from "@/features/Wrapper";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function VolunteerRegisterPage() {
  return (
    <Wrapper hideFooter>
        {/* 插入 GA4 Script */}
      <script
        src="https://www.googletagmanager.com/gtag/js?id=G-G71PVV5FTV"
        strategy="afterInteractive"
      />
      <script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G71PVV5FTV', {
            page_path: window.location.pathname,
          });
        `}
      </script>
      <iframe
        src="https://hualien-volunteers-frontend-iota.vercel.app/"
        className="w-full border-0"
        title="志工媒合"
        allow="geolocation"
        style={{ height: "calc(100vh - 160px)" }}
      />
    </Wrapper>
  );
}
