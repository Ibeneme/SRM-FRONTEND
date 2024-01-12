// Reviews.tsx
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import emoji from "../../../assets/Landingpage/SectionA/memoji/anastasiafrost.png";
import emojione from "../../../assets/Landingpage/SectionA/memoji/i_da_nastya.png";
import emojitwo from "../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import emojithree from "../../../assets/Landingpage/SectionA/memoji/ssemenov.png";
import emojifour from "../../../assets/Landingpage/SectionA/memoji/yourawesam.png";
import {
  MdOutlineMoreHoriz,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import "./SectionC.css";

interface Review {
  title: string;
  text: string;
  image: string;
  name: string;
}

const SectionC: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollReviews = (direction: "left" | "right") => {
    const maxIndex = reviewsData.length - 3;

    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (direction === "right" && currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div data-aos="zoom-in" className="review-container">
      <div
        data-aos="zoom-in"
        style={{ maxWidth: 600, paddingTop: 120, paddingBottom: 64 }}
      >
        <h1 data-aos="zoom-in-right" className="text-content-h1">
          Hear What the
          <span className="header-span"> SE Team</span> <br />
          has to say about our SRM Platform
        </h1>
        <p data-aos="zoom-in-right" className="text-content-p">
          Our unified hub provides a comprehensive view of customer engagements,
          enabling personalized and targeted interactions. From marketing to
          support, cultivate meaningful relationships by harmonizing all
          stakeholder interactions in a single, accessible space.
        </p>
        <div data-aos="zoom-in-right" className="sectionA-left-content">
          <button data-aos="zoom-in-right" className="cta-button">
            Get Started
            <FiArrowRight />
          </button>
        </div>
      </div>
      <div className="reviews-container">
        {reviewsData
          .slice(currentIndex, currentIndex + 3)
          .map((review, index) => (
            <div key={index} data-aos="zoom-in-left" className="review-card">
              <BiSolidQuoteAltLeft style={{ fontSize: 36, color: "#ff5f05" }} />
              <div>
                <p className="teexts-reviews">{review.text}</p>
              </div>
              <div data-aos="zoom-in" className="review-image-name">
                <img
                  data-aos="zoom-in"
                  src={review.image}
                  alt="Description"
                  className="image-emoji"
                />
                <p data-aos="zoom-in" className="review-text-name">
                  {review.name}
                </p>
                <MdOutlineMoreHoriz className="thinking-reviews" />
              </div>
            </div>
          ))}
      </div>
      <div data-aos="zoom-in" className="btn-arrows-reviews">
        <div
          data-aos="zoom-in"
          className="arrow-reviews"
          onClick={() => scrollReviews("left")}
        >
          <MdKeyboardArrowLeft />
        </div>
        <div
          data-aos="zoom-in"
          className="arrow-reviews"
          onClick={() => scrollReviews("right")}
        >
          <MdKeyboardArrowRight />
        </div>
      </div>
    </div>
  );
};

export default SectionC;
const reviewsData: Review[] = [
  {
    name: "Ibeneme Ikenna",
    image: emojifour,
    title: "Title 1",
    text: "Effortless communication with clients has become a reality, all thanks to the remarkable capabilities of this platform. The sophisticated automation features not only save us valuable time but also contribute to a more streamlined workflow. Additionally, the robust analytics tools provide deep insights, empowering us to gain a comprehensive understanding of our customers and their preferences. This platform has truly transformed the way we engage with our clients, making every interaction more meaningful and efficient",
  },
  {
    name: "Olayemi Ogundijo",
    image: emojithree,
    title: "Title 2",
    text: "Seamless communication with clients has become a reality, all thanks to the remarkable capabilities of this platform. The sophisticated automation features not only save us valuable time but also contribute to a more streamlined workflow. Additionally, the robust analytics tools provide deep insights, empowering us to gain a comprehensive understanding of our customers and their preferences. This platform has truly transformed the way we engage with our clients, making every interaction more meaningful and efficient.",
  },
  {
    name: "Nengi Tams",
    image: emojitwo,
    title: "Title 3",
    text: "This platform has brought a new level of efficiency to our client communication. Its remarkable capabilities, coupled with sophisticated automation features, have saved us valuable time and streamlined our workflow. The robust analytics tools offer deep insights, allowing us to understand our customers and their preferences comprehensively. Our interactions with clients have been transformed, making each one more meaningful and efficient.",
  },
  {
    name: "Ibeneme Ikenna",
    image: emojithree,
    title: "Title 4",
    text: "The outstanding capabilities of this platform have turned effortless communication with clients into a reality. The sophisticated automation features not only save us time but also contribute to a more streamlined workflow. The robust analytics tools provide deep insights, empowering us to comprehensively understand our customers and their preferences. This platform has truly revolutionized the way we engage with our clients, enhancing the meaning and efficiency of every interaction.",
  },
  {
    name: "Justina",
    image: emoji,
    title: "Title 5",
    text: "The remarkable capabilities of this platform have made seamless communication with clients a reality. The sophisticated automation features save us valuable time and contribute to a more streamlined workflow. The robust analytics tools provide deep insights, empowering us to gain a comprehensive understanding of our customers and their preferences. This platform has truly revolutionized our client engagement, making every interaction more meaningful and efficient.",
  },
  {
    name: "Ibeneme Ikenna",
    image: emojione,
    title: "Title 6",
    text: "This platform has ushered in a new era of communication with clients, thanks to its remarkable capabilities. The sophisticated automation features not only save us valuable time but also contribute to a more streamlined workflow. The robust analytics tools provide deep insights, empowering us to gain a comprehensive understanding of our customers and their preferences. Truly transformative, this platform has changed the way we engage with our clients, making interactions more meaningful and efficient.",
  },
];
