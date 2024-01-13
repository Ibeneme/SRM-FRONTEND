import React, { useState, ReactNode } from "react";
import "./SettingToggle.css";

interface SettingsToggleProps {
  accountSettingsContent: ReactNode;
  orgSettingsContent: ReactNode;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  accountSettingsContent,
  orgSettingsContent,
}) => {
  const [selectedItem, setSelectedItem] = useState<"account" | "org">(
    "account"
  );

  const handleToggle = (item: "account" | "org") => {
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
            backgroundColor: selectedItem === "account" ? "#ff5f05" : "transparent",
            color: selectedItem === "account" ? "#fff" : "#ff5f05",
          }}
        >
          Account Settings
        </button>
        <button
          className="account-settings-toggle"
          onClick={() => handleToggle("org")}
          style={{
            backgroundColor: selectedItem === "org" ? "#ff5f05" : "transparent",
            color: selectedItem === "org" ? "#fff" : "#ff5f05",
          }}
        >
          Org Settings
        </button>
      </div>
      <br />
      <div className="width-settings">
        {selectedItem === "account" && accountSettingsContent}
        {selectedItem === "org" && orgSettingsContent}
      </div>
    </div>
  );
};

export default SettingsToggle;
