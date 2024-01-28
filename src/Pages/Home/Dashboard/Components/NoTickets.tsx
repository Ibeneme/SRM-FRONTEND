import React from "react";

interface NoTicketsMessageProps {
  heading: string | React.ReactNode;
  paragraph: string;
  imageUrl: string;
  imageAlt: string;
  buttonText?: string;
  onClick?: () => void;
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
        {/* Check if heading is a string or React node */}
        {typeof heading === "string" ? (
          <h2 className="no_tickets-div-h2">{heading}</h2>
        ) : (
          <div className="no_tickets-div-heading">{heading}</div>
        )}
        <p className="no_tickets-div-p">{paragraph}</p>
        <img
          className="no_tickets-div-img"
          src={imageUrl}
          style={{ height: 300 }}
          alt={imageAlt}
        />

        {buttonText ? (
          <button
            className="no_tickets-div-button"
            style={{ color: "white" }}
            onClick={onClick}
          >
            {buttonText}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default NoTicketsMessage;
