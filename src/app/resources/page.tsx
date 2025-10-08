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
