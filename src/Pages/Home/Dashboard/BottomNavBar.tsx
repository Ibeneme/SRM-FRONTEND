import React, { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineNotification,
  AiOutlineFile,
} from "react-icons/ai";
import "./BottomNavBar.css";
import { TbSettings, TbUserEdit, TbUsers } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../Redux/Store";
import { getProfile } from "../../../../Redux/Profile/Profile";
import {
  MdLabelImportantOutline,
  MdNewLabel,
  MdOutlineLabelImportant,
  MdOutlineTag,
} from "react-icons/md";

const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999999,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          marginBottom: 64,
          marginRight: 48,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          minWidth: 250
        }}
      >
        <div style={{ marginBottom: -12, borderBottom: `1px solid #80808045` }}>
          <span>Settings</span>
          <span
            style={{
              float: "right",
              cursor: "pointer",
              fontSize: "24px",
              marginTop: -5
            }}
            onClick={onClose}
          >
            &times;
          </span>
        </div>
        {userProfile?.permission_type === "manager" ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/settings")}
          >
            <TbSettings style={{ fontSize: 20 }} />
            Organisation Settings{" "}
          </span>
        ) : null}

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
          onClick={() => handleNavigate("/Profile")}
        >
          <TbUserEdit style={{ fontSize: 20 }} />
          Account Settings{" "}
        </span>
        {userProfile?.permission_type === "manager" ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/frontdesk")}
          >
            <TbUsers style={{ fontSize: 20 }} />
            Departments & Front Desk
          </span>
        ) : null}
      </div>
    </div>
  );
};

const TicketsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999999,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            marginBottom: 64,
            marginRight: 48,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            minWidth: 250
          }}
        >
          <div
            style={{
              marginBottom: -12,
              borderBottom: `1px solid #80808045`,
              alignItems: "center",
            }}
          >
            <span>Tickets</span>
            <span
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: "24px",
                marginTop: -5
              }}
              onClick={onClose}
            >
              &times;
            </span>
          </div>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/overdue-tickets")}
          >
            <MdOutlineLabelImportant style={{ fontSize: 20 }} />
            Overdue Tickets
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/due-tickets")}
          >
            <MdLabelImportantOutline style={{ fontSize: 20 }} />
            Due Tickets
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/new-tickets")}
          >
            <MdNewLabel style={{ fontSize: 20 }} />
            New Tickets
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/resolved-tickets")}
          >
            <MdOutlineTag style={{ fontSize: 20 }} />
            Resolved Tickets
          </span>
        </div>
      </div>
    </div>
  );
};

const BottomNavBar: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState("");
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = (iconName: string) => {
    setActiveIcon(iconName);
    switch (iconName) {
      case "home":
        console.log("Navigate to Home page");
        navigate('/home')
        break;
      case "tickets":
        console.log("Open Tickets modal");
        setIsTicketsModalOpen(true);
        break;
      case "settings":
        console.log("Open settings modal");
        setIsSettingsModalOpen(true);
        break;
      case "notifications":
        console.log("Navigate to Notifications page");
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setIsSettingsModalOpen(false);
  };

  const handleCloseTicketsModal = () => {
    setIsTicketsModalOpen(false);
  };

  return (
    <div className="bottom-nav">
      <div
        className="bottom-nav-icons"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: activeIcon === "home" ? "#ff6b00" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("home")}
        >
          <AiOutlineHome style={{ fontSize: 22 }} />
          <span style={{ fontSize: 14 }}>Home</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: activeIcon === "tickets" ? "#ff6b00" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("tickets")}
        >
          <AiOutlineFile style={{ fontSize: 22 }} />
          <span style={{ fontSize: 14 }}>Ticket</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: activeIcon === "settings" ? "#ff6b00" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("settings")}
        >
          <AiOutlineSetting style={{ fontSize: 22 }} />
          <span style={{ fontSize: 14 }}>Setting</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: activeIcon === "notifications" ? "#ff6b00" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("notifications")}
        >
          <AiOutlineNotification style={{ fontSize: 22 }} />
          <span style={{ fontSize: 14 }}>Notification</span>
        </div>
      </div>
      <TicketsModal
        isOpen={isTicketsModalOpen}
        onClose={handleCloseTicketsModal}
      />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BottomNavBar;
