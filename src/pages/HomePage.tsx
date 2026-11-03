import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedCollection } from '../components/FeaturedCollection';
import { CollectionTiles } from '../components/CollectionTiles';
import { SeenInSora } from '../components/SeenInSora';
import { TrustAndReviews } from '../components/TrustAndReviews';

interface HomePageProps {
  onOpenPolicy: (key: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenPolicy }) => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Cinematic Hero Opening */}
      <HeroSection />

      {/* 2. Core Curated Frames Grid (Featured Editions) */}
      <FeaturedCollection />

      {/* 3. Architectural Taxonomy Bento Grid (4 Pillars) */}
      <CollectionTiles />

      {/* 4. "SEEN IN SORA" — Real Patrons & Community Runway */}
      <SeenInSora />

      {/* 5. Authentic Appraisals & Verified Reviews / Trust Guarantees */}
      <TrustAndReviews onOpenPolicy={onOpenPolicy} />
    </div>
  );
};
