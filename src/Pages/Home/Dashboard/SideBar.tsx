import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/ssidebar.css";
import { MdSpaceDashboard } from "react-icons/md";
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
      { icon: <TbMail />, text: "Mails", to: "/settings" },
      { icon: <TbMessage />, text: "Chats", to: "/settings" },
      { icon: <TbPhoneCall />, text: "Calls", to: "/settings" },
      { icon: <TbClipboardList />, text: "Feedback Forms", to: "/settings" },
    ],
  },
  {
    title: "MORE",
    items: [
      { icon: <TbHistoryToggle />, text: "History", to: "/" },
      { icon: <TbNotification />, text: "Notifications", to: "/settings" },
      { icon: <TbUserSquareRounded />, text: "Users", to: "/settings" },
      { icon: <TbSettings />, text: "Settings", to: "/settings" },
      { icon: <TbUserEdit />, text: "Profile", to: "/Profile" },
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-title-div">
          <h2 className="sidebar-title">SRM</h2>
        </div>
        <br /> <br /> <br /> <br /> <br />
        <div className="sidebar-headers">
          <NavLink to="/home" end>
            <MdSpaceDashboard /> Dashboard
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
