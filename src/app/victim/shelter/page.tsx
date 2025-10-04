import PageLayout from "@/components/PageLayout";
import VictimAssistance from "@/features/VictimAssistance";

export default function VictimShelterPage() {
  return (
    <PageLayout>
      <VictimAssistance initialCategory="庇護所" />
    </PageLayout>
  );
}
