import { OrcamentView } from "@/features/orcament/OrcamentView";
import { OrcamentSectionClientWrapper } from "./OrcamentSectionClientWrapper";

export default function OrcamentSection() {
  return (
    <OrcamentSectionClientWrapper
      className="pt-20 pb-10 bg-gray-900 text-gray-100"
      id="orcamento"
    >
      <OrcamentView />
    </OrcamentSectionClientWrapper>
  );
}
