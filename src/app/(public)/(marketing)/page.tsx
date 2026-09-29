import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";

const publicPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <PricingSection />
      <FaqSection />
    </>
  );
};

export default publicPage;
