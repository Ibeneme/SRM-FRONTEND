
import React from "react";
import "./ShimmerLoaderPage.css";
 
const ShimmerLoaderPage: React.FC = () => {
  return (
    <div className="shimmer-loader-container">
      <div className="shimmer-loader">
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
      </div>
    </div>
  );
};

export default ShimmerLoaderPage;
