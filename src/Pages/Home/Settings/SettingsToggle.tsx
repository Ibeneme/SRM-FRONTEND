import React, { useState, ReactNode } from "react";
import "../Profile/Components/SettingToggle.css";

interface SettingsToggleProps {
  accountSettingsContent: ReactNode;
  orgSettingsContent: ReactNode;
  departmentsSettingsContent?: ReactNode; // New content for departments
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  accountSettingsContent,
  orgSettingsContent,
  departmentsSettingsContent, // New content for departments
}) => {
  const [selectedItem, setSelectedItem] = useState<
    "account" | "org" | "departments"
  >("account");

  const handleToggle = (item: "account" | "org" | "departments") => {
    setSelectedItem(item);
  };

  return (
    <div className="width-settings">
      <br />
      <div className="top-settings-toggle">
        <button
          onClick={() => handleToggle("account")}
          className="account-settings-toggle"
          style={{
            backgroundColor:
              selectedItem === "account" ? "#ff5f05" : "transparent",
            color: selectedItem === "account" ? "#fff" : "#ff5f05",
          }}
        >
          Users
        </button>
       
        <button
          className="account-settings-toggle"
          onClick={() => handleToggle("org")}
          style={{
            backgroundColor: selectedItem === "org" ? "#ff5f05" : "transparent",
            color: selectedItem === "org" ? "#fff" : "#ff5f05",
          }}
        >
          Organisation Profile
        </button> <button
          className="account-settings-toggle"
          onClick={() => handleToggle("departments")}
          style={{
            backgroundColor:
              selectedItem === "departments" ? "#ff5f05" : "transparent",
            color: selectedItem === "departments" ? "#fff" : "#ff5f05",
          }}
        >
          Departments
        </button>
      </div>
      <br />
      <div className="width-settings">
        {selectedItem === "account" && accountSettingsContent}
        {selectedItem === "org" && orgSettingsContent}
        {selectedItem === "departments" && departmentsSettingsContent}
      </div>
    </div>
  );
};

export default SettingsToggle;
