// App.tsx

import React from "react";
import Hero from "./HeroPage/Hero";
import Navbar from "./Navbar/Navbar";

const LandingPageIndex: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

export default LandingPageIndex;
