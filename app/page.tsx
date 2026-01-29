import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PainPointSection } from "@/components/pain-point-section";
import { FeaturesSection } from "@/components/features-section";
import { PracticePreview } from "@/components/practice-preview";
import { BenefitsSection } from "@/components/benefits-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PainPointSection />
        <FeaturesSection />
        <PracticePreview />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
