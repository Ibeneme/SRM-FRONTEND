// ShimmerLoaderPage.tsx
import React from "react";
import "./ShimmerLoaderPage.css"; // Import a separate CSS file for styling

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
