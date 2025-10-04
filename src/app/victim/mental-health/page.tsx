import PageLayout from "@/components/PageLayout";
import VictimAssistance from "@/features/VictimAssistance";

export default function VictimMentalHealthPage() {
  return (
    <PageLayout>
      <VictimAssistance initialCategory="心理援助" />
    </PageLayout>
  );
}
