import SpotlightBackground from "@/components/ui/spotlight-background";
import { AuthModal } from "@/components/AuthModal";
import { Scroll3D } from "@/components/Scroll3D";
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
      <main className="overflow-x-clip">
        <Scroll3D><Hero /></Scroll3D>
        <Scroll3D><Marquee /></Scroll3D>
        <Scroll3D><About /></Scroll3D>
        <Scroll3D><Work /></Scroll3D>
        <Scroll3D><Process /></Scroll3D>
        <Scroll3D><Pricing /></Scroll3D>
        <Scroll3D><Contact /></Scroll3D>
      </main>
      <Footer />
      <FloatingMenu />
      <AuthModal />
    </div>
  );
}
