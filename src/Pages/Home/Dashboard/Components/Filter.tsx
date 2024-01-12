import React from "react";
import "./Filter.css";
import "./HomeNavbar/HomeNavBar.css";

const FilterBar: React.FC = () => {
  return (
    <div className="filter-bar">
      {/* Search bar */}
      {/* <div className="inputContainer">
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
      </div> */}

      <div className="dropdowns-dashboard">
        {/* Priority dropdown */}
        <div className="filter-item">
          <select className="dashboard-select">
            <option>Select a Priority</option>
            <option>Medium</option>
            <option>Critical</option>
            <option>High</option>
          </select>
        </div>

        {/* Status dropdown */}
        <div className="filter-item">
          <select className="dashboard-select">
            <option>Status</option>
            <option>Overdue</option>
            <option>Due</option>
            <option>Recently Added</option>
          </select>
        </div>

        {/* Date range dropdown */}
        <div className="filter-item">
          <select className="dashboard-select">
            <option>Last 3 days</option>
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 30 days</option>
            <option>Last 60 days</option>
            <option>Last 90 days</option>
            <option>Last 120 days</option>
            <option>Last 360 days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
