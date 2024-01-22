import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/ssidebar.css";
import {
  MdLabelImportantOutline,
  MdOutlineLabelImportant,
  MdSpaceDashboard,
} from "react-icons/md";
import {
  TbClipboardList,
  TbMail,
  TbTicket,
  TbSettings,
  TbMessage,
  TbUserEdit,
  TbUsers,
} from "react-icons/tb";

interface MenuItem {
  icon: React.ReactNode;
  text: string;
  to: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface SidebarProps {
  image?: string;
}

const menuData: MenuCategory[] = [
  {
    title: "MENU",
    items: [
      { icon: <TbTicket />, text: "Tickets", to: "/tickets" },
      { icon: <TbMail />, text: "Mails", to: "/" },
      { icon: <TbMessage />, text: "Chats", to: "/" },
      { icon: <TbClipboardList />, text: "Feedback Forms", to: "/" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { icon: <TbSettings />, text: "Organisation Settings", to: "/settings" },
      { icon: <TbUserEdit />, text: "Account Settings", to: "/Profile" },
      {
        icon: <TbUsers />,
        text: "Departments & Front Desk",
        to: "/frontdesk",
      },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ image }) => {
  const getRandomColor = (letter: string): string => {
    const colors = [
      "orange",
      "#16B4A1",
      "#1962EF",
      "#B45816",
      "#DE4D93",
      "brown",
      "#7B4DDE",
      "#4D64DE",
      "orangered",
    ];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const navigate = useNavigate();

  const [isAccessTokenAvailable, setIsAccessTokenAvailable] =
    useState<boolean>(false);
  const [srmAccessToken, setSrmAccessToken] = useState<string | null>(null);
  const [srmUser, setSrmUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchAccessToken = () => {
      const srm_access_token = localStorage.getItem("srm_access_token");
      const isAvailable = !!srm_access_token;
      if (isAvailable && srm_access_token !== srmAccessToken) {
        setSrmAccessToken(srm_access_token);
        setIsAccessTokenAvailable(isAvailable);
        console.log("Is SRM Access Token Available:", isAvailable);
        console.log("SRM Access Token:", srm_access_token);
      }
    };

    const fetchSrmUser = () => {
      const srm_user = localStorage.getItem("srm_user");
      if (srm_user !== srmUser) {
        setSrmUser(JSON.parse(srm_user || "{}"));
        console.log("SRM User:", srm_user);
      }
    };

    fetchAccessToken();
    fetchSrmUser();

    const handleStorageChange = () => {
      fetchAccessToken();
      fetchSrmUser();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  console.log(isAccessTokenAvailable, "isAccessTokenAvailable");

  const profilePicStyle: React.CSSProperties = {
    backgroundColor: image
      ? "transparent"
      : getRandomColor(srmUser?.first_name[1] || ""),
  };

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-title-div">
          <h2 className="sidebar-title">SRM</h2>
        </div>
        <div className="bottom" onClick={() => navigate("/profile")}>
          <div className="profile-pic-dashboard" style={profilePicStyle}>
            {image ? (
              <img
                src={image}
                alt={`${srmUser?.first_name} ${srmUser?.last_name}`}
              />
            ) : (
              <span
                style={{
                  color: "#fff",
                  fontSize: 13,
                }}
              >
                {srmUser?.first_name[0]}
                {srmUser?.last_name[0]}
              </span>
            )}
          </div>
          <div className="">
            <h2 className="sidebar-names">
              {srmUser?.first_name} {srmUser?.last_name}
            </h2>
            <p className="sidebar-email">{srmUser?.email}</p>
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
