import React, { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "./SideBar";
import "./styles/cards.css";
import "./Dashboard.css";
import Overdue from "../../../assets/Dashboard/NewOverDue.png";
import Due from "../../../assets/Dashboard/NewDue.png";
import Recent from "../../../assets/Dashboard/NewRecent.png";
import { TbBell, TbTicket, TbSearch } from "react-icons/tb";
// import FilterBar from "./Components/Filter";
// import HistoryLog from "./Components/HistoryLog";
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
//import { useNavigate } from "react-router-dom";
import FormHeaders from "../../Auth/Components/FormHeaders";
import TextInputDashboard from "../../Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../Auth/Components/TextInouts/SelectInput";
import HalfButton from "../../Auth/Components/Buttons/HalfBtn";
import PasswordWarning from "../../../components/Error/ErrorWarning";
import ModalSearch from "../../../components/Modal/ModalSearch";
import NotificationListComponent from "./Components/Notifications/NotificationsList";
import { IoTicket } from "react-icons/io5";
import NoTickets from "../../../assets/Dashboard/NoTickets.png";
import NoTicketsMessage from "./Components/NoTickets";

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

const dashboardData = [
  { title: "Overdue Tickets", image: Overdue, number: "50+", color: "#FD1E10" },
  { title: "Due Tickets", image: Due, color: "#FDBA10" },
  {
    title: "Recent Tickets",
    image: Recent,
    number: 3,
    color: "#0FC136",
  },
];
// const historyLogData = [
//   {
//     assignedTo: "Ibeneme Ikenna",
//     title: "Fixing Bugs....",
//     ticketId: "123456",
//     status: "Overdue",
//     date: "2022-01-01",
//     email: "ib@gmail.com",
//     image: image,
//   },
//   {
//     assignedTo: "Ibeneme Ikenna",
//     title: "Fixing Bugs....",
//     ticketId: "789012",
//     status: "Due",
//     date: "2022-01-01",
//     email: "ib@gmail.com",
//     image: image,
//   },
// ];
interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  // const navigate = useNavigate();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<any | null>(null);
  // const isLoading = useSelector((state: RootState) => state.profile.loading);
  // const error = useSelector((state: RootState) => state.profile.error);
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

  useEffect(() => {
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload);
    });

    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (userProfile?.org_setup_complete === false) {
      openModal();
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
        //errorText={formErrors}
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
      <div>{/* ... (other form elements) */}</div>
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

  // if(!isLoading){
  //   return (
  //     <ShimmerLoader />
  //   )
  // }
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  //   // You can perform additional search-related logic here
  // };
  const SearchContent = (
    <div className="FormHeader">
      <div className="vw">
        <h3 className="vw-text">Search</h3>
        {/* <p style={{ display: "none" }}>{searchTerm}</p> */}
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
  return (
    <div className="dashboard-container">
      <Sidebar
      // user_first_name={`${userProfile?.first_name} `}
      // user_last_name={`${userProfile?.last_name}`}
      // usersemail={`${userProfile?.email}
      // `}
      />

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
                <div className="dashboard-bell-search-icons">
                  <TbSearch className="hide" onClick={openModalSearch} />
                  <TbBell onClick={openModalNotifications} />
                </div>
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
                    {/* <div className="div-main-overdue-image">
                      <img
                        src={item.image}
                        style={{ height: 24 }}
                        className="image-main-overdue-image"
                        alt={item.title}
                      /> 
                    </div>*/}
                  </div>
                ))}
              </div>

              <NoTicketsMessage
                heading="Whoops... No Tickets Logged"
                paragraph="No tickets created yet"
                imageUrl={NoTickets}
                imageAlt="No Tickets"
                buttonText="+ Create a Ticket"
                onClick={() => console.log("clicked")}
              />
              {/* <div className="">
                <div className="no_tickets">
                  <div className="no_tickets-div">
                    <h2 className="no_tickets-div-h2">
                      {" "}
                      Whoops... No Tickets Logged
                    </h2>
                    <p className="no_tickets-div-p"> No tickets created yet</p>
                    <img
                      src={NoTickets}
                      style={{ height: 300 }}
                      // className="image-main-overdue-image"
                      alt={NoTickets}
                    />{" "}
                    <button
                      className="no_tickets-div-button"
                      style={{ color: "white" }}
                    >
                      + Create a Ticket
                    </button>
                  </div>{" "}
                </div>
              </div> */}

              {/* <div className="div-split-tickets full-width">
                <FilterBar />
              </div>
              <div>
                <HistoryLog data={historyLogData} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
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
      {userProfile?.org_setup_complete ? null : (
        <div>
          <Modal
            isOpen={isModalOpen}
            onOpen={openModal}
            onClose={closeModal}
            formContent={formContentFirstModal}
          />
        </div>
      )}

      {isSecondModalOpen && (
        <Modal
          isOpen={isSecondModalOpen}
          onOpen={openSecondModal}
          onClose={closeSecondModal}
          formContent={formContentSecondModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
