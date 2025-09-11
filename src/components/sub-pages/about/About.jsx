import React from "react";
import Hero from "./AboutHero";
import Mission from "./AboutMission";
import TeamShowcase from "./AboutTeam";
import AboutStory from "./AboutStory"

export default function AboutPage() {
  return (
    <>
      <Hero />
      <AboutStory />
      {/* <Mission /> */}
      <TeamShowcase />
    </>
  );
}
