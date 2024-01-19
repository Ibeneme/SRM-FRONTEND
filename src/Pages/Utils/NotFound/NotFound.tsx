import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import NotFoundImage from "../../../assets/Dashboard/NotFoundImage.png";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img src={NotFoundImage} alt="Instagram Logo" />
        <h1>Sorry, this page isn't available.</h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed. Go back to{" "}
          <Link to="/" className="link-to-home">
            SRM's Home
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
