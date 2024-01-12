import React, { useEffect, useRef } from "react";
import Mails from "../../../assets/Landingpage/Cards/Mails.jpg";
import Teams from "../../../assets/Landingpage/Cards/Team.png";
import StakeHolders from "../../../assets/Landingpage/Cards/Mails.jpg";
import Tickets from "../../../assets/Landingpage/Cards/Tickets.jpg";
import Filter from "../../../assets/Landingpage/Cards/Filter.png";

const ImageContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const scrollAnimation = () => {
        const scrollDistance = 200;

        // Scroll down for the additional container
        container.scrollTo({
          top: container.scrollTop + scrollDistance,
          behavior: "smooth",
        });

        // Reset to the top for the additional container
        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight
        ) {
          container.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      };

      const intervalId = setInterval(scrollAnimation, 300);

      return () => clearInterval(intervalId);
    }
  }, [containerRef]);

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div className="SectionB-left-content">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
          (imageNumber) => (
            <img
              key={imageNumber}
              src={Mails}
              alt={`Image ${imageNumber}`}
              className="landing-page-scrolling-image"
            />
          )
        )}
      </div>
      <div ref={containerRef} className="additional-content-container">
        {[
          Teams,
          StakeHolders,
          Tickets,
          Teams,
          StakeHolders,
          Tickets,
          Filter,
        ].map((imageSrc, index) => (
          <img
            key={index}
            src={imageSrc}
            alt={`Additional Image ${index}`}
            className="additional-scrolling-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageContainer;
