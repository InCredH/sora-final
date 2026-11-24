import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { HeroCarousel } from '../components/HeroCarousel';
import { FeaturedCollection } from '../components/FeaturedCollection';
import { SeenInSora } from '../components/SeenInSora';

interface HomePageProps {
  onOpenPolicy: (key: string) => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Offers & spotlight frames — first thing visitors see */}
      <HeroCarousel />

      {/* 2. Brand story + frame picker */}
      <HeroSection />

      {/* 2. Curated Silhouettes Grid */}
      {/* <FeaturedCollection /> */}

      {/* 3. "SEEN IN SORA" — Real Patrons & Community Runway */}
      <SeenInSora />
    </div>
  );
};
