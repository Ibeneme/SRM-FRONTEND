import React from "react";

interface NoTicketsMessageProps {
  heading: any;
  paragraph: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  onClick: () => void;
}

const NoTicketsMessage: React.FC<NoTicketsMessageProps> = ({
  heading,
  paragraph,
  imageUrl,
  imageAlt,
  buttonText,
  onClick,
}) => {
  return (
    <div className="no_tickets">
      <div className="no_tickets-div">
        <h2 className="no_tickets-div-h2">{heading}</h2>
        <p className="no_tickets-div-p">{paragraph}</p>
        <img
          className="no_tickets-div-img"
          src={imageUrl}
          style={{ height: 300 }}
          alt={imageAlt}
        />
        <button
          className="no_tickets-div-button"
          style={{ color: "white" }}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default NoTicketsMessage;
