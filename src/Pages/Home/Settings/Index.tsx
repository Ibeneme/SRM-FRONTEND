import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import Overdue from "../../../assets/Dashboard/NewOverDue.png";
import Due from "../../../assets/Dashboard/NewDue.png";
import Recent from "../../../assets/Dashboard/NewRecent.png";
import { TbBell, TbTicket, TbSearch } from "react-icons/tb";
import image from "../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  getOrganizationProfile,
  getProfile,
  getUserCSV,
  importStaff,
  updateOrganizationProfile,
  updatePersonalProfile,
} from "../../../../Redux/Profile/Profile";
import Modal from "../../../components/Modal/Modal";
import FormHeaders from "../../Auth/Components/FormHeaders";
import TextInputDashboard from "../../Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../Auth/Components/TextInouts/SelectInput";
import HalfButton from "../../Auth/Components/Buttons/HalfBtn";
import PasswordWarning from "../../../components/Error/ErrorWarning";
import ModalSearch from "../../../components/Modal/ModalSearch";
import NotificationListComponent from "../Dashboard/Components/Notifications/NotificationsList";
import Sidebar from "../Dashboard/SideBar";
// import SettingsToggle from "./Components/SettingsToggle";
import profileImage from "../../../assets/Dashboard/Profile.png";
import orgImage from "../../../assets/Dashboard/Company.png";
import "../Profile/Profile.css";
import { MdEdit } from "react-icons/md";
import SettingsToggle from "./SettingsToggle";
import { MdCloudUpload } from "react-icons/md";
import "./settings.css";
import Button from "../../Auth/Components/Buttons/Button";
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
  { title: "Overdue Tickets", image: Overdue, number: "50+" },
  { title: "Due Tickets", image: Due },
  { title: "Recently Created Tickets", image: Recent, number: 3 },
];
const historyLogData = [
  {
    assignedTo: "Ibeneme Ikenna",
    ticketId: "T123ABS",
    status: "Overdue",
    date: "2022-01-01",
    title: "Fixing Bugs",
    email: "ib@gmail.com",
    image: image,
  },
  {
    assignedTo: "Ibeneme Ikenna",
    ticketId: "T1SNDH23",
    status: "Due",
    date: "2022-01-01",
    title: "Fixing Bugs",
    email: "ib@gmail.com",
    image: image,
  },
];
interface FormData {
  email: string;
  first_name: string;
  last_name: string;
}

const Settings: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  // const navigate = useNavigate();
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
            console.log(response?.payload);
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
            });
            closeSecondModal();
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
        console.error("Error updating organization profile:", error);
      });
  };
  const handleSecondModalContinue = async () => {
    try {
      setFormErrors("");
      if (formData?.first_name?.length > 0) {
        setLoading(true);

        const response = await dispatch(updatePersonalProfile(formData));
        setLoading(false);
        switch (response?.payload) {
          case 200:
            console.log("Profile successfully updated:", response);
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
            });
            closeModal();
            break;
          case 400:
            setFormErrors("Please Enter a Business Name to Proceed.");
            break;
          default:
            console.log("Unexpected response payload:", response);
            break;
        }
      } else {
        setFormErrors("Please Enter a Business Name to Proceed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating organization profile:", error);
    }
  };

  const formContentFirstModal = (
    <div className="form_content_display-dashboard">
      <br />
      <FormHeaders
        step=""
        activeStepNumber={0}
        totalStepNumbers={0}
        colored="gray"
        title="Edit your Organisation"
        //errorText={formErrors}
        accountText={"Complete these to edit your organisation"}
      />
      <PasswordWarning formErrors={formErrors} />

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
        title="Edit your profile"
        //errorText={formErrors}
        accountText={"Edit your Personal Profile"}
      />{" "}
      <br /> <br />
      <PasswordWarning formErrors={formErrors} />
      <TextInputDashboard
        label="First Name"
        value={formData.first_name}
        onChange={handleChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder="Enter a First Name"
      />
      <TextInputDashboard
        label="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Enter a Last Name"
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  //   const [file, setFile] = useState<File | null>(null);

  //   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files && event.target.files.length > 0) {
  //       setFile(event.target.files[0]);
  //     }
  //   };

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleImportClicks = async () => {
    if (file) {
      setUploadLoading(true); // Set loading to true when starting the upload

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Dispatch the importStaff action with the FormData
        const response = await dispatch(importStaff(formData));
        console.log("Success:", response);
        switch (response?.payload) {
          case 200:
            setFile(null);
            setUploadSuccess("CSV File Successfully Uploaded");
            console.log(
              "Profile successfully updated:",
              uploadSuccess,
              response
            );
            break;
          case 400:
            setFormErrors("An error Occurred");
            break;
          default:
            console.log(
              "Unexpected response payload:",
              uploadSuccess,
              response
            );
            break;
        }

        setTimeout(() => {
          setUploadLoading(false); // Set loading to false after a delay
        }, 2000); // Adjust the delay time as needed
        setUploadError(null);
      } catch (error) {
        setUploadError("An error Occurred");
        console.error("Error:", error);
        setUploadLoading(false); // Set loading to false on error
      }
    } else {
      console.error("No file selected");
    }
  };

  const handleImportClick = () => {
    dispatch(getUserCSV())
      .then((actionResult) => {
        const response = actionResult.payload;
        console.log("Response:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const accountSettingsContent = (
    <div>
      <div className="upload-div">
        <div className="csv-uploader-container">
          {uploadSuccess ? (
            <p
              style={{
                color: "#127E23",
                backgroundColor: "#127E2325",
                padding: 16,
                borderRadius: 24,
              }}
            >
              CSV File Successfully Uploaded
            </p>
          ) : null}
          {uploadError ? <p>{uploadError}</p> : null}
          <label htmlFor="csv-file" className="upload-label">
            <MdCloudUpload className="upload-icon" />
            Upload CSV
          </label>
          <input
            type="file"
            id="csv-file"
            accept=".csv"
            onChange={handleFileChange}
          />
          <p>{file?.name}</p>
          {file?.name ? (
            <button className="button-upload" onClick={handleImportClicks}>
              Import
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );

  const orgSettingsContent = (
    <div>
      <div className="acc-settings-row-reverse">
      
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Sidebar
        user_first_name={`${userProfile?.first_name} `}
        user_last_name={`${userProfile?.last_name}`}
        usersemail={`${userProfile?.email}
  `}
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
                className="main-content-dashboard-div"
                style={{ marginTop: 12 }}
              >
                <SettingsToggle
                  accountSettingsContent={accountSettingsContent}
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
      <ModalSearch
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

export default Settings;
