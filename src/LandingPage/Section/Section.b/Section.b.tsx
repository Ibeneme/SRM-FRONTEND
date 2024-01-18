import React from "react";
import "./SectionB.css";
import { FiArrowRight } from "react-icons/fi";
import useNavigateToCreateAccount from "../../../Pages/Auth/Hook/useCreateAccount";
import ImageContainer from "./ImageContainer";

const SectionB: React.FC = () => {
  return (
    <section data-aos="zoom-in" className="sectionB">
      <div className="sectionB-content-container">
        <ImageContainer />

        <div
          data-aos="zoom-in"
          className="hero-left-content"
          style={{ marginTop: 120 }}
        >
          <h1 data-aos="zoom-in" className="hero-header">
            Stakeholder Friendly
            <br /> Management{" "}
            <span
              data-aos="zoom-in"
              style={{ color: "#FFCA95", textDecorationLine: "underline" }}
            ></span>{" "}
            Software
          </h1>
          <p data-aos="zoom-in" className="hero-smaller-text">
            Elevate your stakeholder engagement strategy by centralizing
            customer interactions. Our unified hub provides a comprehensive view
            of customer engagements, enabling personalized and targeted
            interactions. From marketing to support, cultivate meaningful
            relationships by harmonizing all stakeholder interactions in a
            single, accessible space.
          </p>
          <button
            data-aos="zoom-in"
            onClick={useNavigateToCreateAccount()}
            className="btn-section-b"
          >
            Get Started
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionB;
