import { Hero } from "../components/Hero";
import { PhilosophySection } from "../components/PhilosophySection";
import { ApproachSection } from "../components/ApproachSection";
import { AudienceSection } from "../components/AudienceSection";
import { WaitlistSection } from "../components/WaitlistSection";
import { CompanionSection } from "../components/CompanionSection";

export function NewHome() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Our Philosophy Section */}
      <PhilosophySection />

      {/* Our Approach Section */}
      <ApproachSection />

      {/* Audience Section */}
      <AudienceSection />

      {/* Interactive Companion Naming Game */}
      <CompanionSection />

      {/* Waitlist Section */}
      <WaitlistSection />
    </div>
  );
}