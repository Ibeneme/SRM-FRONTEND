import React, { useEffect } from "react";
import MapSvg from "../../assets/Landingpage/Map/Ball.svg";
import "aos/dist/aos.css";
import ChatAnimations from "../../LandingPage/Animations/HeroAnimations/ChatAnimations/ChatAnimations";
import CreateAccount from "./CreateAccount";

const AuthContainer: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`hero`}>
      <div className="hero-main">
        <div className="hero-left-content">
          <CreateAccount />
        </div>
        <div className="hero-right-content">
          <div className="map-image-container">
            <img
              data-aos="zoom-in"
              src={MapSvg}
              alt="Hero Image"
              className="map-image"
              style={{ width: 4000 }}
            />
          </div>
          <div className="hero-animation-container">
            {/* <HeroAnimation /> */}
            <ChatAnimations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
