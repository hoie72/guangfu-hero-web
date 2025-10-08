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
