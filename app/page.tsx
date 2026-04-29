import { Hero } from "@/components/sections/Hero";
import { DathLogo } from "@/components/shared/DathLogo";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { HexGenesis } from "@/components/sections/HexGenesis";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ConstellationFieldLazy } from "@/components/ui/ConstellationFieldLazy";

export default function Home() {
  return (
    <main className="min-h-screen bg-void relative">
      <ConstellationFieldLazy />
      <DathLogo />
      <div className="relative z-10">
        <Hero />
        <TechMarquee />
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
        <HexGenesis />
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
        <TimelineSection />
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
        <CertificationsSection />
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
        <ContactSection />
      </div>
    </main>
  );
}
