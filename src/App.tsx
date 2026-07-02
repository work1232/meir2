import SpotlightBackground from "@/components/ui/spotlight-background";
import { AuthModal } from "@/components/AuthModal";
import { Navbar } from "@/components/Navbar";
import { FloatingMenu } from "@/components/FloatingMenu";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Site-wide animated "moving bubbles" background (themed to site colors) */}
      <SpotlightBackground />

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <FloatingMenu />
      <AuthModal />
    </div>
  );
}
