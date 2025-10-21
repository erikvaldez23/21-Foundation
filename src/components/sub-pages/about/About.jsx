import React from "react";
import AboutHero from "./AboutHero";
import Mission from "./AboutMission";
import AboutTeam from "./AboutTeam";
import AboutTeam2 from "./AboutTeam2";
import AboutStory from "./AboutStory";
import CTA from "../../key-components/CTA"

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      {/* <Mission /> */}
      <AboutTeam />
      <CTA />
    </>
  );
}
