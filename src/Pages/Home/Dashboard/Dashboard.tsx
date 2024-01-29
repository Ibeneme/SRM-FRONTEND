import React, { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "./SideBar";
import "./styles/cards.css";
import "./Dashboard.css";
import Overdue from "../../../assets/Dashboard/NewOverDue.png";
import Due from "../../../assets/Dashboard/NewDue.png";
import Recent from "../../../assets/Dashboard/NewRecent.png";
import {
  //TbBell,
  TbTicket,
  //TbSearch
} from "react-icons/tb";
import image from "../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  getOrganizationProfile,
  getProfile,
  updateOrganizationProfile,
} from "../../../../Redux/Profile/Profile";
import Modal from "../../../components/Modal/Modal";
import FormHeaders from "../../Auth/Components/FormHeaders";
import TextInputDashboard from "../../Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../Auth/Components/TextInouts/SelectInput";
import HalfButton from "../../Auth/Components/Buttons/HalfBtn";
import PasswordWarning from "../../../components/Error/ErrorWarning";
import ModalSearch from "../../../components/Modal/ModalSearch";
import NotificationListComponent from "./Components/Notifications/NotificationsList";
import { IoTicket } from "react-icons/io5";
import TicketComponentDashboard from "../Tickets/TicketComponent";
import { getAllTickets } from "../../../../Redux/Tickets/Tickets";
//import TicketComponentDashboard from "../Tickets/TicketComponent";
// import NoTickets from "../../../assets/Dashboard/NoTickets.png";
// import NoTicketsMessage from "./Components/NoTickets";

const notificationsData = [
  {
    title: "Assigned a Ticket",
    text: "You just Assigned Hephizbah a New Ticket",
    iconColor: "#3498db",
    textColor: "#80808085",
    titleColor: "#121212",
    image: image,
  },
  {
    title: "Notification Title",
    text: "Don't forget to complete your tasks.",
    iconColor: "#FF7342",
    textColor: "#80808085",
    titleColor: "#121212",
  },
];

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
  });
  const [allTickets, setAllTickets] = useState<any | null>(null);
  useEffect(() => {
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload);
    });

    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      userProfile?.permission_type === "executive" &&
      userProfile?.org_setup_complete === false
    ) {
      openModal();
    } else {
      closeModal();
    }
  }, [userProfile]);



  useEffect(() => {
    if (loading) {
      dispatch(getOrganizationProfile()).then((result) => {
        setOrganizationProfile(result.payload);
      });

      dispatch(getProfile()).then((result) => {
        setUserProfile(result.payload);
        console.log("lal", result);
      });
    }
  }, [profile]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const result = await dispatch(getAllTickets());
        // setFilteredTickets(result.payload);
        setAllTickets(result.payload);
      } catch (error) {
      } finally {
      }
    };
    fetchAllTickets();
  }, [dispatch]);

  const [isModalOpenSearch, setIsModalOpenSearch] = useState(false);
  const [isModalOpenNotifications, setIsModalOpenNotifications] =
    useState(false);
  const openModalSearch = () => {
    setIsModalOpenSearch(true);
  };

  const closeModalSearch = () => {
    setIsModalOpenSearch(false);
  };
  const openModalNotifications = () => {
    setIsModalOpenNotifications(true);
  };

  const closeModalNotifications = () => {
    setIsModalOpenNotifications(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    setSelectedCountry(e.target.value);
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    setSelectedValue(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const handleFirstModalContinue = () => {
    setFormErrors("");
    if (selectedValue && selectedCountry) {
      setLoading(true);
      dispatch(
        updateOrganizationProfile({
          staff_count: selectedValue,
          country: selectedCountry,
        })
      )
        .then((response) => {
          setLoading(false);
          switch (response?.payload) {
            case 200:
              closeModal();
              openSecondModal();
              break;
            case 400:
              setFormErrors("Please enter data correctly");
              break;
            case 500:
              setFormErrors("Server Error");
              break;
            default:
              setFormErrors("Network Error");
              break;
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating organization profile:", error);
        });
    } else {
      setFormErrors(
        "Please choose both Average Number of Staff and Country of Operation."
      );
    }
  };

  const handleSecondModalContinue = () => {
    setFormErrors("");
    if (formData?.first_name?.length > 0) {
      setLoading(true);
      dispatch(
        updateOrganizationProfile({
          nature_of_business: formData?.first_name,
        })
      )
        .then((response) => {
          setLoading(false);
          switch (response?.payload) {
            case 200:
              console.log(
                "Organization profile updated successfully:",
                response
              );
              closeSecondModal();
              break;
            case 400:
              setFormErrors("Please Enter a Business Name to Proceed.");
              break;
            default:
              console.log("Unexpected response payload:", response);
              break;
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating organization profile:", error);
        });
    } else {
      setFormErrors("Please Enter a Business Name to Proceed.");
    }
  };

  const formContentFirstModal = (
    <div className="form_content_display-dashboard">
      <br />
      <FormHeaders
        step="Step"
        activeStepNumber={1}
        totalStepNumbers={2}
        colored="gray"
        title="Setup your Organisation"
        accountText={"Complete these to set up your organisation"}
      />
      <PasswordWarning formErrors={formErrors} />
      <div className="business-name-div">
        <p className="business-name-label">Business Name</p>
        <p className="business-name-fetched">{organizationProfile?.name}</p>
      </div>
      <SelectInput
        placeholder="Select Number of Staff"
        label="Average Number of Staff"
        value={selectedValue}
        onChange={handleSelectChange}
        id="selectOption"
        name="selectOption"
        options={[
          "0 - 10",
          "11 - 50",
          "51 - 100",
          "100 - 500",
          "500 and Above",
        ]}
        required
      />

      <SelectInput
        placeholder="Choose your Country of Operation"
        label="Country of Operation"
        value={selectedCountry}
        onChange={handleCountryChange}
        id="selectCountry"
        name="selectCountry"
        options={["Nigeria", "Ghana"]}
        required
      />
      <HalfButton
        onClick={handleFirstModalContinue}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
    </div>
  );

  const formContentSecondModal = (
    <div className="form_content_display-dashboard">
      <br />
      <FormHeaders
        step="Step"
        activeStepNumber={2}
        totalStepNumbers={2}
        colored="gray"
        title="Setup your Organisation"
        accountText={"Complete these to set up your organisation"}
      />
      <PasswordWarning formErrors={formErrors} />
      <div className="business-name-div">
        <p className="business-name-label">Business Name</p>
        <p className="business-name-fetched">{organizationProfile?.name}</p>
      </div>
      <TextInputDashboard
        label="Nature of Business"
        value={formData.first_name}
        onChange={handleChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder="Nature of Business"
      />
      <HalfButton
        onClick={handleSecondModalContinue}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
      <div>{/* ... (other form elements) */}</div>
    </div>
  );

  const SearchContent = (
    <div className="FormHeader">
      <div className="vw">
        <h3 className="vw-text">Search</h3>
        <TextInputDashboard
          value={formData.first_name}
          onChange={handleChange}
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Search"
        />
      </div>
    </div>
  );

  const NotificationsDisplay = (
    <div className="FormHeader">
      <div className="vw">
        <NotificationListComponent notifications={notificationsData} />
      </div>
    </div>
  );

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
  const dashboardData = [
    {
      title: "Overdue Tickets",
      image: Overdue,
      number: overdueItems?.length,
      color: "#FD1E10",
    },
    {
      title: "Due Tickets",
      image: Due,
      color: "#FDBA10",
      number: dueItems?.length,
    },
    {
      title: "Resolved Tickets",
      image: Recent,
      number: resolvedItems?.length,
      color: "#0FC136",
    },
  ];

  console.log(userProfile, "userProfile");
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content-container">
        <div className="dashboard-cards-container">
          <div className="dashboard-content">
            <div className="main-content-container">
              <div className="main-content-dashboard-div">
                <div>
                  <div>
                    <h2 className="main-content-dashboard-h2">
                      Hello, {userProfile?.first_name} {userProfile?.last_name}{" "}
                      👋
                    </h2>
                    <p className="main-content-dashboard-p">
                      Here's what's going on today.
                    </p>
                  </div>{" "}
                </div>
                {/* <div className="dashboard-bell-search-icons">
                  <TbSearch className="hide" onClick={openModalSearch} />
                  <TbBell onClick={openModalNotifications} />
                </div> */}
              </div>

              <div className="div-split-tickets">
                {dashboardData.map((item, index) => (
                  <div key={index} className="div-dashboard-overdue">
                    <div className="div-overdue-icons">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: item.color,
                            padding: 12,
                            borderRadius: 12,
                            fontSize: 20,
                            height: 24,
                            width: 24,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#Fff",
                          }}
                        >
                          <IoTicket />
                        </div>
                        <p className="overdue-texts-dashboard">{item.title}</p>
                      </div>
                      <span style={{ fontSize: 24, position: "relative" }}>
                        <TbTicket style={{ marginLeft: -12 }} />
                        {item?.number ? (
                          <p className="tickets-number-unread">
                            {item?.number}
                          </p>
                        ) : null}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="div-split-tickets"></div>
              <div className="margin-fixes">
                <div className="margin-fixes-h3">
                  <h3 className="margin-fixes-h3-h3">All Tickets</h3>
                  <p className="main-content-dashboard-p">
                    Create and view all your tickets here
                  </p>
                </div>

                <TicketComponentDashboard ticketReturn />
              </div>
              {/* 
              <NoTicketsMessage
                heading="Whoops... No Tickets Logged"
                paragraph="No tickets created yet"
                imageUrl={NoTickets}
                imageAlt="No Tickets"
                buttonText="+ Create a Ticket"
                onClick={() => console.log("clicked")}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {userProfile?.permission_type === "executive" && (
        <>
          <ModalSearch
            isOpen={isModalOpenSearch}
            onOpen={openModalSearch}
            onClose={closeModalSearch}
            formContent={SearchContent}
          />
          <ModalSearch
            isOpen={isModalOpenNotifications}
            onOpen={openModalNotifications}
            onClose={closeModalNotifications}
            formContent={NotificationsDisplay}
          />
          {!userProfile?.org_setup_complete && (
            <Modal
              isOpen={isModalOpen}
              onOpen={openModal}
              onClose={closeModal}
              formContent={formContentFirstModal}
            />
          )}
          {isSecondModalOpen && (
            <Modal
              isOpen={isSecondModalOpen}
              onOpen={openSecondModal}
              onClose={closeSecondModal}
              formContent={formContentSecondModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
