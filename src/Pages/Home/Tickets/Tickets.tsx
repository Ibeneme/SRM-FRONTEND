import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/styles/cards.css";
import "../Dashboard/Dashboard.css";
import { TbBell, TbSearch } from "react-icons/tb";
import image from "../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  getAllUsers,
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
import { createTicket } from "../../../../Redux/Tickets/Tickets";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import useCustomToasts from "../../Utils/ToastNotifications/Toastify";
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
  stakeholder_name: string;
  last_name: string;
  company_name: string;
}
interface UsersLogItem {
  department: string | null;
  status: string;
  permission_type: string;
  first_name: string;
  title: string;
  email: string;
  image: string;
  last_name: string;
  id: string;
  phone_number: string;
  email_verified: string;
}
const TicketDashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useCustomToasts();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<any | null>(null);
  // const isLoading = useSelector((state: RootState) => state.profile.loading);
  // const error = useSelector((state: RootState) => state.profile.error);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogItem[]>([]);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [createTicketLoading, setCreateTicketLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [formData, setFormData] = useState<FormData>({
    stakeholder_name: "",
    last_name: "",
    company_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const result = await dispatch(getAllUsers());
        setFetchedUsers(result.payload);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  console.log(fetchedUsers, userProfile, "fetchedUsers");
  useEffect(() => {
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload);
    });

    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  const renderOptions = () => {
    if (fetchedUsers?.length > 0) {
      return fetchedUsers?.map((users) => (
        <option key={users.id} value={users.id}>
          {users.first_name} {users.last_name}
        </option>
      ));
    } else {
      return (
        <option value={userProfile?.id} disabled>
          {userProfile?.first_name} {userProfile?.last_name}
        </option>
      );
    }
  };

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
        //console.log("lal", result);
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
    if (formData?.stakeholder_name?.length > 0) {
      setLoading(true);
      dispatch(
        updateOrganizationProfile({
          nature_of_business: formData?.stakeholder_name,
        })
      )
        .then((response) => {
          setLoading(false);
          switch (response?.payload) {
            case 200:
              // console.log(
              //   "Organization profile updated successfully:",
              //   response
              // );
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
      <PasswordWarning formErrors={formErrors} />
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
        value={formData.stakeholder_name}
        onChange={handleChange}
        type="text"
        id="stakeholder_name"
        name="stakeholder_name"
        placeholder="Nature of Business"
      />
      <HalfButton
        onClick={handleSecondModalContinue}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
      <br />
      <PasswordWarning formErrors={formErrors} />
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
          value={formData.stakeholder_name}
          onChange={handleChange}
          type="text"
          id="stakeholder_name"
          name="stakeholder_name"
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
    stakeholder_name: "",
    handler_id: "",
    email: "",
  });

  const [createTicketFormDataErrors, setCreateTicketFormDataErrors] = useState({
    priority: "",
    sla_category: "",
    type: "",
    title: "",
    description: "",
    stakeholder_name: "",
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
    // console.log(createTicketFormData, "dgdg");
    let hasErrors = false;
    const newErrors = { ...createTicketFormDataErrors };

    // Validate stakeholder_name
    if (!createTicketFormData.stakeholder_name.trim()) {
      newErrors.stakeholder_name = "Stakholders Name is required";
      hasErrors = true;
    }
    if (!createTicketFormData.email.trim()) {
      newErrors.email = "Email is required";
      hasErrors = true;
    }

    // Validate title
    if (!createTicketFormData.title.trim()) {
      newErrors.title = "Title is required";
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
    if (!createTicketFormData.description.trim()) {
      newErrors.description = "Ticket description is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setCreateTicketFormDataErrors(newErrors);
      return;
    }

    console.log(createTicketFormData, "createTicketFormData");
    //    setCreateTicketLoading(false);
    setFormErrors("");
    setCreateTicketLoading(true);
    dispatch(createTicket(createTicketFormData))
      .then((response) => {
        setCreateTicketLoading(false);
        console.log("Ticket created successfully:", response);
        //closeCreateTicketModal();
        switch (response?.payload) {
          case 201:
            console.log("Profile successfully updated:", response);
            closeCreateTicketModal();
            showSuccessToast("Ticket Created Successfully");
            break;
          case 400:
            setFormErrors("Please Fill these forms correctly to Proceed.");
            break;
          default:
            console.log("Unexpected response payload:", response);
            showErrorToast("An Error Occurred");
            break;
        }
      })

      .catch((error) => {
        setCreateTicketLoading(false);
        console.error("Error creating ticket:", error);
      });
    setCreateTicketLoading(false);
  };

  const openCreateTicketModalContent = (
    <div className="form_content_display-dashboard">
      <br />
      <MdCancel
        onClick={closeCreateTicketModal}
        size={24}
        color={"#FF7342"}
        style={{ cursor: "pointer" }}
      />
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
        label="Email"
        value={createTicketFormData.email}
        onChange={handleCreateTicketInputChange}
        type="email"
        id="email"
        name="email"
        placeholder="Email Address"
        error={createTicketFormDataErrors.email}
      />
      <TextInputDashboard
        label="Stakeholders Name"
        value={createTicketFormData.stakeholder_name}
        onChange={handleCreateTicketInputChange}
        type="text"
        id="stakeholder_name"
        name="stakeholder_name"
        placeholder="Stakeholders Name"
        error={createTicketFormDataErrors.stakeholder_name}
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
        options={["low", "medium", "high"]}
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
        options={["standard", "medium", "complex"]}
        error={createTicketFormDataErrors.sla_category}
        required
      />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label className="business-name-label"> Select a Department </label>

        <select
          style={{ height: 48, padding: 12, width: "100%" }}
          className={`${"select-dashboard"}`}
          value={createTicketFormData.handler_id}
          onChange={(e) =>
            setCreateTicketFormData((prevData) => ({
              ...prevData,
              handler_id: e.target.value,
            }))
          }
        >
          {renderOptions()}
        </select>
        <p
          className="business-name-label"
          style={{
            marginTop: 4,
            marginBottom: -0,
            color: "#FF7342",
            textAlign: "right",
          }}
          onClick={() => navigate("/users")}
        >
          {fetchedUsers?.length > 0 ? null : "Add More Users to handle tickets"}
        </p>
      </div>
      <br />
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
        options={["standard", "medium", "complex"]}
        error={createTicketFormDataErrors.type}
        required
      />
      <TextInputDashboard
        label="Description"
        value={createTicketFormData.description}
        onChange={(e) =>
          setCreateTicketFormData((prevData) => ({
            ...prevData,
            description: e.target.value,
          }))
        }
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        height
        error={createTicketFormDataErrors.description}
      />
      <HalfButton
        onClick={handleCreateTicket}
        text="Create Ticket"
        loading={createTicketLoading}
        disabled={createTicketLoading}
      />
      <br />
      <PasswordWarning formErrors={formErrors} />

      <div>{/* ... (other form elements) */}</div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Sidebar
      // user_stakeholder_name={`${userProfile?.stakeholder_name} `}
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
