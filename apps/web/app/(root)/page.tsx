import LandingHeroSection from "@/components/mvpblocks/landing-hero-section";
import GameShowcase from "@/components/mvpblocks/game-showcase";

export default function Home() {
  return (
    <div className="space-y-10">
      <LandingHeroSection />
      <GameShowcase />
    </div>
  );
}
