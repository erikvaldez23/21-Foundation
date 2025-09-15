import React from "react";
import AboutHero from "./AboutHero";
import Mission from "./AboutMission";
import AboutTeam from "./AboutTeam2";
import AboutTeam2 from "./AboutTeam2";
import AboutStory from "./AboutStory"

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      {/* <Mission /> */}
      <AboutTeam2 />
    </>
  );
}
