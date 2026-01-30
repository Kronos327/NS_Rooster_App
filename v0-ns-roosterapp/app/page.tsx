import { HeroSection } from "@/components/hero-section";
import { StepsSection } from "@/components/steps-section";
import { AudienceSection } from "@/components/audience-section";
import { WarningSection } from "@/components/warning-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <StepsSection />
      <AudienceSection />
      <WarningSection />
      <Footer />
    </main>
  );
}
