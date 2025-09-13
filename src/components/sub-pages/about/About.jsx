import React from "react";
import AboutHero from "./AboutHero";
import Mission from "./AboutMission";
import TeamShowcase from "./AboutTeam";
import AboutStory from "./AboutStory"

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      {/* <Mission /> */}
      <TeamShowcase />
    </>
  );
}
