// import React, { useState, useEffect, useRef } from "react";
// import "./SectionA.css";
// import Dashboard from "../../../assets/Landingpage/SectionA/Dashboard.png";

// const SectionA: React.FC = () => {
//   const [inView, setInView] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.6, // Adjust the threshold as needed
//     };

//     const handleIntersection = (entries: IntersectionObserverEntry[]) => {
//       entries.forEach((entry) => {
//         setInView(entry.isIntersecting);
//       });
//     };

//     const observer = new IntersectionObserver(handleIntersection, options);

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section className={`sectionA ${inView ? "inView" : ""}`} ref={sectionRef}>
//       <div className="content-container-section">
//         <div>
//           <div className="text-content">
//             <h1>Big Header Text 1</h1>
//             <p>A smaller text goes here.</p>
//             <button>Click me</button>
//           </div>
//           <div className="content-container">
//             <div className="text-content">
//               <h1>Big Header Text 2</h1>
//               <p>Another smaller text goes here.</p>
//               <button>Click me</button>
//             </div>
//           </div>

//           <div className="content-container">
//             <div className="text-content">
//               <h1>Big Header Text 3</h1>
//               <p>Yet another smaller text goes here.</p>
//               <button>Click me</button>
//             </div>
//           </div>

//           <div className="content-container">
//             <div className="text-content">
//               <h1>Big Header Text 4</h1>
//               <p>One more smaller text goes here.</p>
//               <button>Click me</button>
//             </div>
//           </div>
//         </div>

//         <div
//           className={` ${
//             inView ? "inView-image-container" : "image-container"
//           }`}
//           ref={sectionRef}
//         >
//           <img src={Dashboard} alt="Description" style={{ borderRadius: 12 }} />
//         </div>
//       </div>

//       {/* Additional content sections */}
//     </section>
//   );
// };

// export default SectionA;
// .sectionA {
//     background-color: transparent;
//     color: black;
//     padding: 300px 50px;
//     height: 100%;
//   }
//   .content-container-section {
//     display: flex;
//     justify-content: space-between;
//     border: 14px solid #fff;
//     align-items: baseline;
//   }
//   .content-container {
//     display: flex;
//     align-items: center;
//   }
  
//   .text-content {
//     flex: 1;
//     text-align: center;
//   }
  
//   h1 {
//     font-size: 2em;
//     margin-bottom: 10px;
//   }
  
//   p {
//     font-size: 1.2em;
//     margin-bottom: 20px;
//   }
  
//   button {
//     padding: 10px 20px;
//     font-size: 1.2em;
//   }
  
//   .image-container {
//     flex: 1;
//     margin-left: 20px;
//   }
  
//   img {
//     max-width: 100%;
//     height: auto;
//   }
  
//   .inView .inView-image-container {
//     position: fixed;
//     top: 50%;
//     left: 40%;
//     transform: translateY(-50%);
//     transition: opacity 0.5s ease;
//     border: 14px solid #ff5f0545;
//     border-radius: 24px;
  
//   }
  
//   .image-container {
//     transform: translateY(-50%);
//     transition: opacity 0.5s ease;
//     border: 14px solid green;
//     width: 50%;
//     border-radius: 24px;
//   }
  

// SectionA.tsx

// import React from "react";
// import "./SectionA.css"; // Don't forget to create your corresponding CSS file
// import { FiArrowRight } from "react-icons/fi";
// import Dashboard from "../../../assets/Landingpage/SectionA/Dashboard.png";

// const SectionA: React.FC = () => {
//   return (
//     <section className="sectionA">
//       <div className="content-container">
//         <div className="hero-left-content" style={{maxWidth: 600}}>
//           <h1 className="text-content-h1">
//             Harmonizing Customer Interactions: Building a Unified Hub for
//             Enhanced Stakeholder Engagement
//           </h1>
//           <p className="text-content-p">
//             Elevate your stakeholder engagement strategy by centralizing
//             customer interactions. Our unified hub provides a comprehensive view
//             of customer engagements, enabling personalized and targeted
//             interactions. From marketing to support, cultivate meaningful
//             relationships by harmonizing all stakeholder interactions in a
//             single, accessible space.
//           </p>
//           <button className="nav-button">
//             Get Started
//             <FiArrowRight />
//           </button>
//         </div>
//         <div className="hero-right-content" style={{maxWidth: 600}}>
//           <img src={Dashboard} alt="Description" className="image-right" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SectionA;
