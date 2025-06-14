import LandingHeroSection from "@/components/mvpblocks/landing-hero-section";
import GameShowcase from "@/components/mvpblocks/game-showcase";
import FeatureHighlights from "@/components/mvpblocks/feature-highlights";
import StatsMetrics from "@/components/mvpblocks/stats-metrics";
import RecentActivityFeed from "@/components/mvpblocks/recent-activity-feed";
import NewsUpdatesSection from "@/components/mvpblocks/news-updates-section";
import Footer from "@/components/mvpblocks/footer";

export default function Home() {
  return (
    <div>
      <LandingHeroSection />
      <GameShowcase />
      <FeatureHighlights />
      <StatsMetrics />
      <RecentActivityFeed />
      <NewsUpdatesSection />
      <Footer />
    </div>
  );
}
