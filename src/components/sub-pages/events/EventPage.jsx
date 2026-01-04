import React from 'react';
import EventHero from './EventHero';
import EventContent from './EventsContent';
import CTA from "../../key-components/CTA";


export default function EventPage() {
  return (
    <>
      <EventHero />
      <EventContent />
      <CTA />
    </>
  );
}