import Wrapper from "@/features/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResourcesPage() {
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
        src="https://pinkowo.github.io/hualien-bees/"
        className="w-full border-0"
        title="物資媒合"
        allow="geolocation"
        style={{ height: "calc(100vh - 160px)" }} // header 4 rem + footer 140 px
      />
    </Wrapper>
  );
}
