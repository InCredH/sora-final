import { usePageTitle } from "@/hooks/usePageMeta";
import { Hero } from "@/components/home/Hero";
import { BrandSection, CampaignSection, FeaturedSection, InstagramSection, NewArrivalsSection, ValuesSection } from "@/components/home/Sections";

export default function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <FeaturedSection />
      <BrandSection />
      <NewArrivalsSection />
      <CampaignSection />
      <ValuesSection />
      <InstagramSection />
    </>
  );
}
