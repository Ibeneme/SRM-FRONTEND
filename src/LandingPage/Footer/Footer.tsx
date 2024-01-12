import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="social-icons">
        <FaTwitter className="icon" data-aos="zoom-in" />
        <FaFacebook className="icon" data-aos="zoom-in" />
        <FaLinkedin className="icon" data-aos="zoom-in" />
        <FaInstagram className="icon" data-aos="zoom-in" />
      </div>
      <div className="copyright" data-aos="zoom-in">
        SRM Built by the Antigravity's Team &copy; 2024
      </div>
    </footer>
  );
};

export default Footer;
