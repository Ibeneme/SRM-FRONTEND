import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/ssidebar.css";
import {
  MdLabelImportantOutline,
  MdNewLabel,
  MdOutlineLabelImportant,
  MdOutlineTag,
  MdSpaceDashboard,
  // MdOutlineFolderCopy,
  // MdOutlineFolderSpecial,
  // MdOutlineDevicesFold,
} from "react-icons/md";
import {
  // TbClipboardList,
  //TbMail,
  TbTicket,
  TbSettings,
  // TbMessage,
  TbUserEdit,
  TbUsers,
} from "react-icons/tb";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../../../Redux/Tickets/Tickets";
import { getProfile } from "../../../../Redux/Profile/Profile";
import RandomColorComponent from "./RandomColor";
//import RandomColorComponent from "./RandomColor";

interface MenuItem {
  icon: React.ReactNode;
  text: string;
  to: string;
  number?: any;
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

const MainSidebar: React.FC<SidebarProps> = () => {
  //  const [srmAccessToken, setSrmAccessToken] = useState<string | null>(null);
  const [srmUser, setSrmUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [allTickets, setAllTickets] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const result = await dispatch(getAllTickets());
        setAllTickets(result.payload);
      } catch (error) {
      } finally {
      }
    };
    fetchAllTickets();
  }, [dispatch]);

  const overdueItems = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (allTickets) {
        return ticket.status === `overdue`;
      }
    }
  );
  const dueItems = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (allTickets) {
        return ticket.status === `due`;
      }
    }
  );

  const resolvedItems = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (allTickets) {
        return ticket.status === `resolved`;
      }
    }
  );
  const closedItems = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (allTickets) {
        return ticket.status === `closed`;
      }
    }
  );

  const menuData: MenuCategory[] = [
    {
      title: "Tickets",
      items: [
        { icon: <TbTicket />, text: "All Tickets", to: "/tickets" },
        // {
        //   icon: <TbTicket />,
        //   text: "Tickets by Prority",
        //   to: "/ticket-by-prority",
        // },
      ],
    },

    // {
    //   title: "Tickets by Status",
    //   items: [
    //     {
    //       icon: <MdOutlineFolderSpecial />,
    //       text: "Priority High Tickets",
    //       to: "/priority-high-tickets",
    //     },
    //     {
    //       icon: <MdOutlineFolderCopy />,
    //       text: "Priority Medium Tickets",
    //       to: "/priority-medium-tickets",
    //     },

    //     {
    //       icon: <MdOutlineDevicesFold />,
    //       text: "Priority Low Tickets",
    //       to: "/priority-low-tickets",
    //     },
    //   ],
    // },

    {
      title: "Tickets by Prority",
      items: [
        {
          icon: <MdOutlineLabelImportant />,
          text: "Overdue Tickets",
          to: "/overdue-tickets",
          number: overdueItems?.length,
        },
        {
          icon: <MdLabelImportantOutline />,
          text: "Due Tickets",
          to: "/due-tickets",
          number: dueItems?.length,
        },

        {
          icon: <MdNewLabel />,
          text: "New Tickets",
          to: "/new-tickets",
        },
        {
          icon: <MdOutlineTag />,
          text: "Resolved Tickets",
          to: "/resolved-tickets",
          number: resolvedItems?.length,
        },
        {
          icon: <MdOutlineTag />,
          text: "Closed Tickets",
          to: "/closed-tickets",
          number: closedItems?.length,
        },
      ],
    },

    {
      title: "SETTINGS",
      items: [
        {
          icon: <TbSettings />,
          text: "Organisation Settings",
          to: "/settings",
        },
        { icon: <TbUserEdit />, text: "Account Settings", to: "/Profile" },
        {
          icon: <TbUsers />,
          text: "Departments & Front Desk",
          to: "/frontdesk",
        },
      ],
    },
  ];
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state: RootState) => state.profile.profile);
  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      setSrmUser(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      dispatch(getProfile()).then((result) => {
        setUserProfile(result.payload);
        console.log("lal", result);
        setLoading(false);
      });
    }
  }, [profile]);

  //   useEffect(() => {
  //     const fetchAccessToken = () => {
  //       const srm_access_token = localStorage.getItem("srm_access_token");
  //       const isAvailable = !!srm_access_token;
  //       if (isAvailable && srm_access_token !== srmAccessToken) {
  //         setSrmAccessToken(srm_access_token);
  //       }
  //     };

  //     const fetchSrmUser = () => {
  //       const srm_user = localStorage.getItem("srm_user");
  //       if (srm_user !== srmUser) {
  //         setSrmUser(JSON.parse(srm_user || "{}"));
  //         //console.log("SRM User:", srm_user);
  //       }
  //     };

  //     fetchAccessToken();
  //     fetchSrmUser();

  //     const handleStorageChange = () => {
  //       fetchAccessToken();
  //       fetchSrmUser();
  //     };

  //     window.addEventListener("storage", handleStorageChange);

  //     return () => {
  //       window.removeEventListener("storage", handleStorageChange);
  //     };
  //   }, []);

  //console.log(isAccessTokenAvailable, "isAccessTokenAvailable");
  const navigate = useNavigate();

  return (
    <div className="sidebar-main" onClick={() => setLoading(true)}>
      <div>
        <div className="sidebar-title-div">
          <h2 className="sidebar-title">SRM</h2>
        </div>
        <br /> <br /> <br /> <br />
        <div className="sidebar-headers">
          <NavLink to="/home" end>
            <MdSpaceDashboard /> Dashboard
          </NavLink>
        </div>
        <br />
        {/* <div className="sidebar-headers mt mtt">
          <NavLink to="/" end>
            <MdOutlineLabelImportant /> Overdue Tickets
          </NavLink>
        </div> */}
        {/* <div className="sidebar-headers mt">
          <NavLink to="/" end>
            <MdLabelImportantOutline /> Due Tickets
          </NavLink>
        </div> */}
        {menuData.map((menu, index) => (
          <div key={index}>
            <p className="title-sidebar-p">{menu.title}</p>
            {menu.items.map((item, subIndex) => (
              <div key={subIndex} className="sidebar-headers">
                {userProfile?.permission_type !== "manager" &&
                (item.text === "Organisation Settings" ||
                  item.text === "Departments & Front Desk") ? null : (
                  <NavLink
                    to={item.to}
                    className="link"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {item.icon} {item.text}
                    </span>
                    <span style={{ fontSize: 24, position: "relative" }}>
                      {item?.number ? (
                        <p className="tickets-number-unread-sidebar">
                          {item?.number}
                        </p>
                      ) : null}
                    </span>
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            height: 100,
          }}
        ></div>
        <div className="bottom" onClick={() => navigate("/profile")}>
          <div className="profile-pic-dashboard">
            <RandomColorComponent
              firstName={srmUser?.first_name || ""}
              lastName={srmUser?.last_name || ""}
            />
          </div>

          <div className="">
            <h2 className="sidebar-names">
              {srmUser?.first_name} {srmUser?.last_name}
            </h2>
            <p className="sidebar-email">{srmUser?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
