import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/styles/cards.css";
import "../Dashboard/Dashboard.css";
import { TbBell, TbSearch } from "react-icons/tb";
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
//import NotificationListComponent from "./Components/Notifications/NotificationsList";
import NoTickets from "../../../assets/Dashboard/NoTickets.png";
import NoTicketsMessage from "../Dashboard/Components/NoTickets";
import NotificationListComponent from "../Dashboard/Components/Notifications/NotificationsList";
import Sidebar from "../Dashboard/SideBar";
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

const TicketDashboard: React.FC = () => {
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

  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [createTicketFormData, setCreateTicketFormData] = useState({
    priority: "",
    sla_category: "",
    type: "",
    title: "",
    description: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    handler_id: "",
    email: "",
  });

  const [createTicketFormDataErrors, setCreateTicketFormDataErrors] = useState({
    priority: "",
    sla_category: "",
    type: "",
    title: "",
    description: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    handler_id: "",
    email: "",
  });
  const handleCreateTicketInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTicketFormData((prevData) => ({ ...prevData, [name]: value }));
    setCreateTicketFormDataErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const openCreateTicketModal = () => {
    setIsCreateTicketModalOpen(true);
  };

  const closeCreateTicketModal = () => {
    setIsCreateTicketModalOpen(false);
  };

  const handleCreateTicket = () => {
    console.log(createTicketFormData, "dgdg");
    let hasErrors = false;
    const newErrors = { ...createTicketFormDataErrors };

    // Validate first_name
    if (!createTicketFormData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
      hasErrors = true;
    }

    // Validate last_name
    if (!createTicketFormData.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
      hasErrors = true;
    }

    // Validate title
    if (!createTicketFormData.title.trim()) {
      newErrors.title = "Title is required";
      hasErrors = true;
    }

    // Validate phone_number
    if (!createTicketFormData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
      hasErrors = true;
    }

    if (!createTicketFormData.priority.trim()) {
      newErrors.priority = "Select a Priority it is required";
      hasErrors = true;
    }

    if (!createTicketFormData.type.trim()) {
      newErrors.type = "Select a Type it is required";
      hasErrors = true;
    }

    if (!createTicketFormData.sla_category.trim()) {
        newErrors.sla_category = "Select a SLA Category it is required";
        hasErrors = true;
      }

  
    if (hasErrors) {
      setCreateTicketFormDataErrors(newErrors);
      return;
    }

    setFormErrors("");
    // setCreateTicketLoading(true);
    // dispatch(createTicket(createTicketFormData))
    //   .then((response) => {
    //     setCreateTicketLoading(false);
    //     // Handle the response, close modal, etc.
    //     console.log("Ticket created successfully:", response);
    //     closeCreateTicketModal();
    //   })
    //   .catch((error) => {
    //     setCreateTicketLoading(false);
    //     console.error("Error creating ticket:", error);
    //     // Handle the error, show error message, etc.
    //   });
  };

  const openCreateTicketModalContent = (
    <div className="form_content_display-dashboard">
      <br />
      <FormHeaders
        step=""
        activeStepNumber={1}
        totalStepNumbers={2}
        colored="gray"
        title="Create a Ticket"
        accountText={"Complete these to create a unique Ticket"}
      />
      <PasswordWarning formErrors={formErrors} />

      <br />
      <br />
      <TextInputDashboard
        label="First Name"
        value={createTicketFormData.first_name}
        onChange={handleCreateTicketInputChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder="Enter First Name"
        error={createTicketFormDataErrors.first_name}
      />
      <TextInputDashboard
        label="Last Name"
        value={createTicketFormData.last_name}
        onChange={handleCreateTicketInputChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Enter Last Name"
        error={createTicketFormDataErrors.last_name}
      />
      <TextInputDashboard
        label="Ticket Title"
        value={createTicketFormData.title}
        onChange={handleCreateTicketInputChange}
        type="text"
        id="title"
        name="title"
        placeholder="Enter a ticket title"
        error={createTicketFormDataErrors.title}
        required
      />
      <TextInputDashboard
        label="Phone Number"
        value={createTicketFormData.phone_number}
        onChange={handleCreateTicketInputChange}
        type="text"
        id="phone_number"
        name="phone_number"
        placeholder="Enter a Phone Number"
        error={createTicketFormDataErrors.phone_number}
        required
      />

      <SelectInput
        placeholder="Select Ticket Priority"
        label="Select Ticket Priority"
        value={createTicketFormData.priority}
        onChange={(e) =>
          setCreateTicketFormData((prevData) => ({
            ...prevData,
            priority: e.target.value,
          }))
        }
        id="selectPriority"
        name="selectPriority"
        options={["Low", "Medium", "High", "Critical"]}
        error={createTicketFormDataErrors.priority}
        required
      />

      <SelectInput
        placeholder="SLA Category"
        label="SLA Category"
        value={createTicketFormData.sla_category}
        onChange={(e) =>
          setCreateTicketFormData((prevData) => ({
            ...prevData,
            sla_category: e.target.value,
          }))
        }
        id="selectPriority"
        name="selectPriority"
        options={["Low", "Medium", "High", "Critical"]}
        error={createTicketFormDataErrors.sla_category}
        required
      />

      <SelectInput
        placeholder="Select Ticket Type"
        label="Select Ticket Type"
        value={createTicketFormData.type}
        onChange={(e) =>
          setCreateTicketFormData((prevData) => ({
            ...prevData,
            type: e.target.value,
          }))
        }
        id="selectType"
        name="selectType"
        options={["Standard", "Medium", "Complex"]}
        error={createTicketFormDataErrors.type}
        required
      />

      <HalfButton
        onClick={handleCreateTicket}
        text="Create Ticket"
        loading={loading}
        disabled={loading}
      />
      <div>{/* ... (other form elements) */}</div>
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
                    <h2 className="main-content-dashboard-h2">Tickets</h2>
                    <p className="main-content-dashboard-p">
                      Create and view all your tickets here
                    </p>
                  </div>{" "}
                </div>
                <div className="dashboard-bell-search-icons">
                  <TbSearch className="hide" onClick={openModalSearch} />
                  <TbBell onClick={openModalNotifications} />
                </div>
              </div>

              {/* <div className="div-split-tickets">
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
                    </div
                  </div>
                ))}
              </div> */}
              <div style={{ marginTop: 44 }}>
                <NoTicketsMessage
                  heading="Whoops... No Tickets Logged"
                  paragraph="No tickets created yet"
                  imageUrl={NoTickets}
                  imageAlt="No Tickets"
                  buttonText="+ Create a Ticket"
                  onClick={openCreateTicketModal}
                />
              </div>
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

      <Modal
        isOpen={isCreateTicketModalOpen}
        onOpen={openCreateTicketModal}
        onClose={closeCreateTicketModal}
        formContent={openCreateTicketModalContent}
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

export default TicketDashboard;
