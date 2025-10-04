import PageLayout from "@/components/PageLayout";
import VictimAssistance from "@/features/VictimAssistance";

export default function VictimMedicalPage() {
  return (
    <PageLayout>
      <VictimAssistance initialCategory="醫療站" />
    </PageLayout>
  );
}
