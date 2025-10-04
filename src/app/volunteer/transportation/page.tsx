import PageLayout from "@/components/PageLayout";
import VolunteerInfo from "@/features/VolunteerInfo";

export default function VolunteerTransportationPage() {
  return (
    <PageLayout>
      <VolunteerInfo initialCategory="交通資訊" />
    </PageLayout>
  );
}
