import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Platform } from "../components/Platform";
import { Team } from "../components/Team";
import { Mission } from "../components/Mission";
import { ContactSection } from "../components/ContactSection";

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Platform />
      <Team />
      <Mission />
      <ContactSection />
    </main>
  );
}
