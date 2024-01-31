// SectionA.tsx

import React from "react";
import "./SectionA.css"; // Don't forget to create your corresponding CSS file
import { FiArrowRight } from "react-icons/fi";
import emoji from "../../../assets/Landingpage/SectionA/memoji/anastasiafrost.png";
import emojione from "../../../assets/Landingpage/SectionA/memoji/i_da_nastya.png";
import emojitwo from "../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import emojithree from "../../../assets/Landingpage/SectionA/memoji/ssemenov.png";
import emojifour from "../../../assets/Landingpage/SectionA/memoji/yourawesam.png";
import useNavigateToCreateAccount from "../../../Pages/Auth/Hook/useCreateAccount";

const SectionA: React.FC = () => {
  return (
    <section data-aos="zoom-in" className="sectionA">
      <div className="content-container">
        <div className="" style={{ maxWidth: 600 }}>
          <h1 data-aos="zoom-in" className="text-content-h1">
            Optimize {""}
            <span className="header-span">
              {""}Efficiency{""}
            </span>{" "}
            with our Custom Stakeholder Support Solution{" "}
          </h1>
          <p data-aos="zoom-in" className="text-content-p">
            Enhance stakeholder experience by providing prompt and upbeat
            service with our support powerhouse. Manage stakeholder
            interactions, requests, and resolve issues efficiently. Deliver
            seamless support anytime, anywhere.
          </p>
          <div data-aos="zoom-in" className="sectionA-left-content">
            <button
              className="cta-button"
              onClick={useNavigateToCreateAccount()}
            >
              Get Started
              <FiArrowRight />
            </button>
            <div data-aos="zoom-in" style={{ display: "flex", gap: 12 }}>
              <img
                data-aos="zoom-in"
                src={emoji}
                alt="Description"
                className="image-emoji"
              />
              <img
                data-aos="zoom-in"
                src={emojione}
                alt="Description"
                className="image-emoji"
              />
              <img
                data-aos="zoom-in"
                src={emojitwo}
                alt="Description"
                className="image-emoji"
              />
              <img
                data-aos="zoom-in"
                src={emojithree}
                alt="Description"
                className="image-emoji"
              />
              <img
                data-aos="zoom-in"
                src={emojifour}
                alt="Description"
                className="image-emoji"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionA;
