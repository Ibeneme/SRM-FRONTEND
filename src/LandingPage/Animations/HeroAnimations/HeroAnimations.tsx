import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiFolder,
  FiMail,
  FiPhone,
  FiFile,
  FiUsers,
} from "react-icons/fi";
import "../HeroAnimations/HeroAnimations.css";
import FilterImage from "../../../assets/Landingpage/Cards/Filter.png";
import MailsImage from "../../../assets/Landingpage/Cards/Mails.jpg";
import RecentImage from "../../../assets/Landingpage/Cards/Recent.png";
import StakeholdersImage from "../../../assets/Landingpage/Cards/Stakeholders.png";
import TeamImage from "../../../assets/Landingpage/Cards/Team.png";
import TicketsImage from "../../../assets/Landingpage/Cards/Tickets.jpg";

const HeroAnimation: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [showFlipDown, setShowFlipDown] = useState(false);

  const icons = [
    {
      name: "home",
      component: FiHome,
      image1: StakeholdersImage,
      image2: MailsImage,
    },
    {
      name: "tickets",
      component: FiFolder,
      image1: TicketsImage,
      image2: RecentImage,
    },
    {
      name: "messages",
      component: FiMail,
      image1: MailsImage,
      image2: TeamImage,
    },
    {
      name: "calls",
      component: FiPhone,
      image1: RecentImage,
      image2: FilterImage,
    },
    {
      name: "forms",
      component: FiFile,
      image1: FilterImage,
      image2: StakeholdersImage,
    },
    {
      name: "teams",
      component: FiUsers,
      image1: TeamImage,
      image2: TicketsImage,
    },
  ];

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setShowFlipDown(false);
      setActiveIcon(icons[index].name);
      index = (index + 1) % icons.length;
    }, 1300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (activeIcon) {
      const delayTimeout = setTimeout(() => {
        setShowFlipDown(true);
      }, 400);

      return () => clearTimeout(delayTimeout);
    }
  }, [activeIcon]);

  return (
    <div className="hero-animation">
      <div className="active-image-container">
        {activeIcon && (
          <div style={{ display: "flex", gap: 12 }}>
            <div
              className={`hero-images flip-up ${
                showFlipDown ? "fading-out" : ""
              }`}
            >
              <img
                className={`hero-images flip-up`}
                src={icons.find((icon) => icon.name === activeIcon)?.image1}
                alt={`${activeIcon} Image 1`}
              />
            </div>
            <div className="hero-animations-icons-container">
              {icons.map((icon) => (
                <div
                  key={icon.name}
                  className={`icon-container ${
                    activeIcon === icon.name ? "active" : ""
                  }`}
                >
                  {React.createElement(icon.component, {
                    className: `icon ${
                      activeIcon === icon.name ? "filled" : "outlined"
                    }`,
                    style: {
                      color: activeIcon === icon.name ? "orangered" : undefined,
                    },
                  })}
                </div>
              ))}
            </div>

            <div
              className={`hero-images flip-down ${
                showFlipDown ? "fading-out" : ""
              }`}
            >
              <img
                className={`hero-images flip-down`}
                src={icons.find((icon) => icon.name === activeIcon)?.image2}
                alt={`${activeIcon} Image 2`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroAnimation;
