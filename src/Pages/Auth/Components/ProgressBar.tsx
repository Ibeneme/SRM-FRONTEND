// import React from "react";

// interface ProgressBarProps {
//   activeStepNumber: number;
//   totalStepNumbers: number;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ activeStepNumber, totalStepNumbers }) => {
//   const calculateWidth = () => {
//     // Calculate the width of the progress bar based on the active step and total steps
//     const widthPercentage = (activeStepNumber / totalStepNumbers) * 100;
//     return `${widthPercentage}%`;
//   };

//   return (
//     <div style={{ backgroundColor: "green", height: 20 }}>
//       <div
//         style={{
//           backgroundColor: "#ff5f05",
//           height: 20,
//           width: calculateWidth(),
//         }}
//       />
//     </div>
//   );
// };

// export default ProgressBar;
