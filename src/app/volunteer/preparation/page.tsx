import PageLayout from "@/components/PageLayout";
import VolunteerInfo from "@/features/VolunteerInfo";

export default function VolunteerPreparationPage() {
  return (
    <PageLayout>
      <VolunteerInfo initialCategory="行前必讀" />
    </PageLayout>
  );
}
