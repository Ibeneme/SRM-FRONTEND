import React from "react";
import "./Hero.css";
import { FiArrowRight } from "react-icons/fi";
import MapSvg from "../../assets/Landingpage/Map/Ball.svg";
import { overflowLogos } from "./Logo";
import { BiSolidInfoCircle } from "react-icons/bi";
import ChatAnimations from "../Animations/HeroAnimations/ChatAnimations/ChatAnimations";
import useNavigateToCreateAccount from "../../Pages/Auth/Hook/useCreateAccount";

const Hero: React.FC = () => {
  return (
    <div className={`hero`}>
      <div className="hero-main">
        <div className="hero-left-content">
          <h1 className="hero-header">
            Build Excellent
            <br />
            <span className="header-span">Stakeholder </span>
            relationship
          </h1>
          <p className="hero-smaller-text">
            Create a robust yet user-friendly software solution that
            effortlessly integrates your data, teams, and customer interactions
            into a unified platform. This adaptable customer platform scales
            seamlessly with your business, providing powerful functionality
            without overwhelming complexity.
          </p>
          <div style={{ height: 100 }}>
            <button
              data-aos="zoom-in"
              onClick={useNavigateToCreateAccount()}
              className="nav-button"
            >
              Get Started
              <FiArrowRight />
            </button>
          </div>
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

      <div data-aos="zoom-in" className="overflow-logos-container">
        <span className="span-logos">
          <p className="overflow-future-integration">
            <p className="overflow-future-integration-p">
              Our Future Integrations{" "}
            </p>{" "}
            <BiSolidInfoCircle />
          </p>
        </span>
      </div>

      <div data-aos="zoom-in" className="scrollable-logos-container">
        <div className="overflow-logos-container-div">
          {overflowLogos.map((logo, index) => (
            <div key={index} className="overflow-logo">
              <img
                data-aos="zoom-in"
                src={logo.icon}
                alt={logo.name}
                className="overflow-logo-image"
              />
              <p className="overflow-logo-name">{logo.name} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
