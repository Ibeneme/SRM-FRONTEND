import React from "react";
import "./HomeNavBar.css";
import emoji from "../../../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import { MdNotifications, MdSearch } from "react-icons/md";
interface HomeNavbarProps {}

const HomeNavbar: React.FC<HomeNavbarProps> = () => {
  return (
    <div className="homeNavbar">
      <div className="content">
        <div className="inputContainer">
          <div className="home-navabr-searchInput-relative">
            <input
              type="text"
              placeholder="Search"
              className="home-navabr-searchInput"
            />
            <div className="home-navabr-searchInput-icon">
              <MdSearch />
            </div>
          </div>
        </div>
        <div className="home-nav-bar-right-content-div">
          <div className="home-navbar-bell-icon-div">
            <MdNotifications />
          </div>
          <div className="home-nav-bar-div-profile-content">
            <img
              className="home-nav-bar-div-profile-content-img"
              src={emoji}
              alt={emoji}
            />
            <div className="home-nav-bar-div-profile-content-div">
              <h2 className="home-nav-bar-div-profile-content-div-h2">
                Ibeneme Ikenna
              </h2>
              <p className="home-nav-bar-div-profile-content-div-p">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
