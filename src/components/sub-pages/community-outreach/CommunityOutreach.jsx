import React from 'react';
import CommunityOutreachHero from './CommunityOutreachHero';
import ScholarshipSection from './ScholarshipSection';
import MentalHealthSection from './MentalHealthSection';
import CTA from '../../key-components/CTA';

export default function CommunityOutreach() {
  return (
    <>
      <CommunityOutreachHero />
      <ScholarshipSection />
      <MentalHealthSection />
      <CTA />
    </>
  );
}
