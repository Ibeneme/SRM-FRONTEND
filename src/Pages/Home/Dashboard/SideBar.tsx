import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/ssidebar.css";
import {
  MdLabelImportantOutline,
  MdOutlineLabelImportant,
  MdSpaceDashboard,
} from "react-icons/md";
import {
  TbClipboardList,
  TbHistoryToggle,
  TbMail,
  TbPhoneCall,
  TbTicket,
  TbNotification,
  TbUserSquareRounded,
  TbSettings,
  TbMessage,
  TbUserEdit,
} from "react-icons/tb";

const menuData = [
  {
    title: "MENU",
    items: [
      { icon: <TbTicket />, text: "Tickets", to: "/" },
      { icon: <TbMail />, text: "Mails", to: "/" },
      { icon: <TbMessage />, text: "Chats", to: "/" },
      { icon: <TbPhoneCall />, text: "Calls", to: "/" },
      { icon: <TbClipboardList />, text: "Feedback Forms", to: "/" },
    ],
  },
  {
    title: "MORE",
    items: [
      { icon: <TbHistoryToggle />, text: "History", to: "/" },
      { icon: <TbNotification />, text: "Notifications", to: "/" },
      { icon: <TbUserSquareRounded />, text: "Users", to: "/users" },
      { icon: <TbSettings />, text: "Settings", to: "/settings" },
      { icon: <TbUserEdit />, text: "Profile", to: "/Profile" },
    ],
  },
];

interface SidebarProps {
  user_last_name: string;
  user_first_name: string;
  usersemail: string;
  image?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  user_first_name,
  user_last_name,
  usersemail,
  image,
}) => {
  const getRandomColor = (letter: string): string => {
    const colors = [
      "orange",
      "red",
      "darkblue",
      "green",
      "black",
      "brown",
      "gray",
      "purple",
      "orangered",
    ];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const profilePicStyle: React.CSSProperties = {
    backgroundColor: image ? "transparent" : getRandomColor(user_first_name[1]),
  };
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-title-div">
          <h2 className="sidebar-title">SRM</h2>
        </div>
        <div className="bottom" onClick={() => navigate("/profile")}>
          <div className="profile-pic-dashboard" style={profilePicStyle}>
            {image ? (
              <img src={image} alt={`${user_first_name} ${user_last_name}`} />
            ) : (
              <span
                style={{
                  color: "#fff",
                  fontSize: 13,
                }}
              >
                {user_first_name[0]}
                {user_last_name[0]}
              </span>
            )}
          </div>
          <div className="">
            <h2 className="sidebar-names">
              {user_first_name} {user_last_name}
            </h2>
            <p className="sidebar-email">{usersemail}</p>
          </div>
        </div>
        <br /> <br /> <br /> <br />
        <div className="sidebar-headers">
          <NavLink to="/home" end>
            <MdSpaceDashboard /> Dashboard
          </NavLink>
        </div>
        <br />
        <div className="sidebar-headers mt mtt">
          <NavLink to="/" end>
            <MdOutlineLabelImportant /> Overdue Tickets
          </NavLink>
        </div>
        <div className="sidebar-headers mt">
          <NavLink to="/" end>
            <MdLabelImportantOutline /> Due Tickets
          </NavLink>
        </div>
        {menuData.map((menu, index) => (
          <div key={index}>
            <p className="title-sidebar-p">{menu.title}</p>

            {menu.items.map((item, subIndex) => (
              <div key={subIndex} className="sidebar-headers">
                <NavLink to={item.to} className="link">
                  {item.icon} {item.text}
                </NavLink>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
