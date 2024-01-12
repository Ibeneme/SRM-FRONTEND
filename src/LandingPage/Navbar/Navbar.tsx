import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import "./Navbar.css";
import useNavigateToCreateAccount from "../../Pages/Auth/Hook/useCreateAccount";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="nav">
      <div className={`${isScrolled ? "scrolledNav" : "navbar"}`}>
        {/* // <div className={`navbar`}> */}
        <div className="navbar-div">
          <div className="nav-left-content">
            <p className="nav-logo-text">SRM</p>
          </div>
          <div className="nav-right-content">
            <button
              className={`${isScrolled ? "scrolledNavbtn" : "nav-button"}`}
              onClick={useNavigateToCreateAccount()}
            >
              Get Started
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
