import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { AreasSection } from "@/components/areas-section"
import { TransparencySection } from "@/components/transparency-section"
import { ProgressUpdatesSection } from "@/components/progress-updates-section"
import { ArticlesSection } from "@/components/articles-section"
import { EventsSection } from "@/components/events-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ThreeDBackground } from "@/components/3d-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 relative">
      <ThreeDBackground />
      <Navigation />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <AreasSection />
        <TransparencySection />
        <ProgressUpdatesSection />
        <ArticlesSection />
        <EventsSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
