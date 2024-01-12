import React from 'react';
import './Shimmer.css'; 


const ShimmerLoader: React.FC =() => {
  return (
    <div className={`loading`}>
      <div className="shimmer-loader"></div>
    </div>
  );
};

export default ShimmerLoader;
