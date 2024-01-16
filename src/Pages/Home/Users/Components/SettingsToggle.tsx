import React, { useState, ReactNode } from "react";
import "./SettingToggle.css";

interface UsersToggleProps {
  usersSettingsContent: ReactNode;
  orgSettingsContent: ReactNode;
}

const UsersToggle: React.FC<UsersToggleProps> = ({
  usersSettingsContent,
  orgSettingsContent,
}) => {
  const [selectedItem, setSelectedItem] = useState<"users" | "department">(
    "users"
  );

  const handleToggle = (item: "users" | "department") => {
    setSelectedItem(item);
  };

  return (
    <div className="width-settings">
      <br />
      <div className="top-settings-toggle">
        <button
          onClick={() => handleToggle("users")}
          className="account-settings-toggle"
          style={{
            backgroundColor:
              selectedItem === "users" ? "#ff5f05" : "transparent",
            color: selectedItem === "users" ? "#fff" : "#ff5f05",
          }}
        >
          Users
        </button>
        <button
          className="account-settings-toggle"
          onClick={() => handleToggle("department")}
          style={{
            backgroundColor:
              selectedItem === "department" ? "#ff5f05" : "transparent",
            color: selectedItem === "department" ? "#fff" : "#ff5f05",
          }}
        >
          Department
        </button>
      </div>
      <br />
      <div className="width-settings">
        {selectedItem === "users" && usersSettingsContent}
        {selectedItem === "department" && orgSettingsContent}
      </div>
    </div>
  );
};

export default UsersToggle;
