import React, { useState } from "react";
import "./NotificationComponent.css"; // You can create a CSS file for styling
import { BsBell } from "react-icons/bs"; // You may need to install the react-icons library

interface NotificationProps {
  title: string;
  text: string;
  iconColor?: string;
  textColor?: string;
  titleColor?: string;
  image?: string;
}

const Notification: React.FC<NotificationProps> = ({
  title,
  text,
  iconColor = "#000",
  textColor = "#000",
  titleColor = "#000",
  image,
}) => {
  return (
    <div className="notification">
      {image ? (
        <img
          src={image}
          alt={image}
          style={{
            width: 48,
          }}
        />
      ) : (
        <div
          className="notification-toggle"
          style={{
            backgroundColor: iconColor,
          }}
        >
          <BsBell color={`${"#ffffff"}`} />
        </div>
      )}
      <div className="notification-content">
        <p className="notification-content-h" style={{ color: titleColor }}>
          {title}
        </p>
        <p className="notification-content-p" style={{ color: textColor }}>
          {text}
        </p>
      </div>
    </div>
  );
};

interface NotificationListComponentProps {
  notifications: NotificationProps[];
}

const NotificationListComponent: React.FC<NotificationListComponentProps> = ({
  notifications,
}) => {
  const [showAll, setShowAll] = useState<boolean>(true);

  const toggleNotifications = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="notification-list">
      <h3 className="vw-text" style={{ marginTop: -43 }}>
        Notifications
      </h3>
      <div
        className="notification-toggle"
        style={{ display: "none" }}
        onClick={toggleNotifications}
      >
        <BsBell />{" "}
      </div>
      {showAll && (
        <div className="notification-container">
          {notifications.map((notification, index) => (
            <Notification key={index} {...notification} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationListComponent;
