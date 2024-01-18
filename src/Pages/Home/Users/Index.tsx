import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
// import Overdue from "../../../assets/Dashboard/NewOverDue.png";
// import Due from "../../../assets/Dashboard/NewDue.png";
// import Recent from "../../../assets/Dashboard/NewRecent.png";
import { TbBell, TbSearch } from "react-icons/tb";
import image from "../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  createDepartment,
  getAllUsers,
  getDepartments,
  getOrganizationProfile,
  getProfile,
  getUserCSV,
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
// import FilterBar from "../Dashboard/Components/Filter";
// import HistoryLog from "../Dashboard/Components/HistoryLog";
import NotificationListComponent from "../Dashboard/Components/Notifications/NotificationsList";
import Sidebar from "../Dashboard/SideBar";
// import SettingsToggle from "./Components/SettingsToggle";
import profileImage from "../../../assets/Dashboard/Profile.png";
// import orgImage from "../../../assets/Dashboard/Company.png";
import "../Profile/Profile.css";
// import { MdEdit } from "react-icons/md";
// import SettingsToggle from "../Profile/Components/SettingsToggle";
import "./Index.css";
import UsersToggle from "./Components/SettingsToggle";
// import DepartmentList from "./Components/Department";
// import CsvReaderComponent from "./Components/CSVReaderComponent";
// import CSVReader from "./Components/CSVReaderComponent";
// import CSVViewer from "./Components/CSVReaderComponent";
// import ShimmerLoader from "../../../components/ShimmerLoader/Shimmer";
import UsersLog from "./Components/Users";
import GridComponent from "./Components/Department";


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

// const dashboardData = [
//   { title: "Overdue Tickets", image: Overdue, number: "50+" },
//   { title: "Due Tickets", image: Due },
//   { title: "Recently Created Tickets", image: Recent, number: 3 },
// ];
// const historyLogData = [
//   {
//     assignedTo: "Ibeneme Ikenna",
//     ticketId: "T123ABS",
//     status: "Overdue",
//     date: "2022-01-01",
//     title: "Fixing Bugs",
//     email: "ib@gmail.com",
//     image: image,
//   },
//   {
//     assignedTo: "Ibeneme Ikenna",
//     ticketId: "T1SNDH23",
//     status: "Due",
//     date: "2022-01-01",
//     title: "Fixing Bugs",
//     email: "ib@gmail.com",
//     image: image,
//   },
// ];
interface FormData {
  email: string;
  first_name: string;
  last_name: string;
}

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  // const navigate = useNavigate();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  const [usersInCSV, setUsersInCSV] = useState<any | null>(null);
  const [users, setUsers] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [departments, setDepartment] = useState<any | null>(null);
  const profile = useSelector((state: RootState) => state.profile.profile);
  // const isLoading = useSelector((state: RootState) => state.profile.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload);
    });

    dispatch(getDepartments()).then((result) => {
      setDepartment(result.payload);
    });
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
    dispatch(getUserCSV()).then((result) => {
      setUsersInCSV(result.payload);
    });
    dispatch(getAllUsers()).then((result) => {
      setUsers(result.payload);
    });
  }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(getProfile()).then((result) => {
  //       setUserProfile(result.payload);
  //     });
  //   }, [userProfile]);

  useEffect(() => {
    if (loading) {
      dispatch(getOrganizationProfile()).then((result) => {
        setOrganizationProfile(result.payload);
      });

      dispatch(getDepartments()).then((result) => {
        setDepartment(result.payload);
        //  console.log("lal", result);
      });
    }
  }, [profile]);
  console.log("users", users);

  if (userProfile?.length === 0) {
    // console.log("lolp", userProfile);
  }
  console.log("usersInCSV", usersInCSV);
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
    setLoading(true);
    dispatch(
      updateOrganizationProfile({
        staff_count: selectedValue,
        country: selectedCountry,
        name: formData.first_name
          ? formData.first_name
          : organizationProfile?.name,
        email: formData.last_name
          ? formData.last_name
          : organizationProfile?.email,
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
          case 422:
            setFormErrors("Please enter a valid email address");
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
        console.log("Error updating organization profile:", error);
      });
  };
  const handleSecondModalContinue = async () => {
    try {
      setFormErrors("");
      if (formData?.first_name?.length > 0) {
        setLoading(true);

        const response = await dispatch(
          createDepartment({
            name: formData?.first_name,
            description: formData?.last_name,
          })
        );
        setLoading(false);
        switch (response?.payload) {
          case 200:
            console.log("Profile successfully updated:", response);
            closeModal();
            break;
          case 400:
            setFormErrors("Please Fill these forms correctly to Proceed.");
            break;
          default:
            console.log("Unexpected response payload:", response);
            break;
        }
      } else {
        setFormErrors("Please Fill these forms correctly to Proceed.");
      }
    } catch (error) {
      setLoading(false);
      //console.error("Error updating organization profile:", error);
    }
  };
  //   if (isLoading) {
  //     return;
  //     <ShimmerLoader />;
  //   }
  const formContentFirstModal = (
    <div className="form_content_display-dashboard">
      <br />
      <FormHeaders
        step=""
        activeStepNumber={0}
        totalStepNumbers={0}
        colored="gray"
        title="Create a Department"
        //errorText={formErrors}
        accountText={"Complete these to create a department"}
      />
      {/* <PasswordWarning formErrors={formErrors} /> */}

      <br />
      <br />
      <TextInputDashboard
        label="Business Name"
        value={formData.first_name}
        onChange={handleChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder="Enter a Business Name"
      />
      <TextInputDashboard
        label="Email Address"
        value={formData.last_name}
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Enter a Email Address"
      />
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
        activeStepNumber={0}
        totalStepNumbers={0}
        title="Create a Department"
        //errorText={formErrors}
        accountText={"Complete these to create a department"}
      />{" "}
      <PasswordWarning formErrors={formErrors} />
      <br /> <br />
      <TextInputDashboard
        label="Department Name"
        value={formData.first_name}
        onChange={handleChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder="Enter a Department Name"
      />
      <TextInputDashboard
        label="Description - 20 words"
        value={formData.last_name}
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Enter a Description"
        height
      />
      <HalfButton
        onClick={handleSecondModalContinue}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
      <div></div>
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
  // };

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

  // const [file, setFile] = useState<File | null>(null);

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  // const handleImportClick = () => {
  //   dispatch(getUserCSV())
  //     .then((actionResult) => {
  //       const response = actionResult.payload; // Access the payload from the action result
  //       console.log("Response:", response);
  //       setUsers(response);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  console.log("Success:", users);

  const accountSettingsContent = (
    <div>
      <div style={{ backgroundColor: "#fff", padding: 12, borderRadius: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <HalfButton
            onClick={openModal}
            text="+ Add a User"
            loading={loading}
            disabled={loading}
          />
        </div>
        <UsersLog data={users} />
      </div>
    </div>
  );

  const orgSettingsContent = (
    <div className="org-settings-content">
      <div className="header-container"></div>
      {/* <CSVViewer url={usersInCSV} /> */}
      {departments?.length === 0 ? (
        <div className="empty-departments-container">
          <h3>No Departments Created yet</h3>
          <p className="dept-texts">Whoops no have no Departments</p>
          <img src={profileImage} width="250" />
          <br /> <br /> <br />
          <div>
            <HalfButton
              onClick={openModal}
              text="+ Create a Department"
              loading={loading}
              disabled={loading}
            />{" "}
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{ width: "100%", borderRadius: 24, padding: 0, margin: 0 }}
            className="departments-container"
          >
            <div
              className="create-department-button-container"
              style={{ padding: 16 }}
            >
              <HalfButton
                onClick={openModal}
                text="+ Create a Department"
                loading={loading}
                disabled={loading}
              />
            </div>
            <div style={{ width: "100%", padding: 0, margin: 0 }}>
              <GridComponent items={departments} />
              {/* <div className="account-settings-background"> */}
              {/* </div><img src={profileImage} width="400" />
        {" "} */}{" "}
            </div>
          </div>
        </div>
      )}
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

              <div
              // className="main-content-dashboard-div"
              // style={{ marginTop: 12 }}
              >
                <UsersToggle
                  usersSettingsContent={accountSettingsContent}
                  orgSettingsContent={orgSettingsContent}
                />
              </div>
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
        isOpen={isModalOpen}
        onOpen={openModal}
        onClose={closeModal}
        formContent={formContentSecondModal}
      />
      <ModalSearch
        isOpen={isSecondModalOpen}
        onOpen={openSecondModal}
        onClose={closeSecondModal}
        formContent={formContentFirstModal}
      />

      {userProfile?.org_setup_complete ? null : (
        <div>
          {isSecondModalOpen && (
            <Modal
              isOpen={isSecondModalOpen}
              onOpen={openSecondModal}
              onClose={closeSecondModal}
              formContent={formContentSecondModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
