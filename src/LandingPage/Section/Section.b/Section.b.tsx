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
            A Holistic Stakeholder
            <span
              data-aos="zoom-in"
              style={{ color: "#FFCA95", textDecorationLine: "underline" }}
            ></span>{" "}
            Management Solution
          </h1>
          <p data-aos="zoom-in" className="hero-smaller-text">
            Streamline your workflow, effortlessly manage stakeholders, and
            foster seamless collaboration among your teams in a centralized hub.
            Boost team productivity and Increase Stakeholder satisfaction and
            Loyalty!
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
