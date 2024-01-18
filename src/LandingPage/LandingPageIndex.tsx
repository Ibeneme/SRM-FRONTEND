import React from "react";
import Hero from "./HeroPage/Hero";
import SectionA from "./Section/Section.a/Section.a";
import SectionB from "./Section/Section.b/Section.b";
//import SectionC from "./Section/Section.c/SectionC";
// import SectionD from "./Section/Section.d/SectionD";
import Footer from "./Footer/Footer";

const LandingPageIndex: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#FFF3E4" }}>
      {/* <div style={{ backgroundColor: "#FFE9D3" }}></div> */}
      <div style={{ zIndex: 1 }}>
        <Hero />
      </div>
      <div style={{ zIndex: 1 }}>
        <SectionA />
      </div>
      <div style={{ zIndex: 1 }}>
        <SectionB />
      </div>
      {/*    <div style={{ zIndex: 1 }}>
        <SectionC />
      </div>
 <div style={{ zIndex: 1 }}>
        <SectionD />
      </div> */}
      <div style={{ zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPageIndex;
