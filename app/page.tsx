import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Background3DLazy } from "@/components/ui/Background3DLazy";

export default function Home() {
  return (
    <main className="min-h-screen bg-void relative">
      <Background3DLazy />
      <div className="relative z-10">
        <Hero />
        <TechMarquee />
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
        <ProjectShowcase />
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
