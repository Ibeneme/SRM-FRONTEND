import React, { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "./SideBar";
import "./styles/cards.css";
import "./Dashboard.css";
import Overdue from "../../../assets/Dashboard/Overdue.png";
import Due from "../../../assets/Dashboard/Due.png";
import Recent from "../../../assets/Dashboard/Recent.png";
import { TbBell, TbTicket, TbSearch } from "react-icons/tb";
import FilterBar from "./Components/Filter";
import HistoryLog from "./Components/HistoryLog";
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

const dashboardData = [
  { title: "Overdue Tickets", image: Overdue },
  { title: "Due Tickets", image: Due },
  { title: "Recently Created Tickets", image: Recent },
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
    if (userProfile?.org_setup_complete === true) {
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

  // const [errors, setErrors] = useState<{
  //   email?: string;
  //   first_name?: string;
  //   last_name?: string;
  //   company_name?: string;
  // }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
   // setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
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

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content-container">
        <div className="dashboard-cards-container">
          <div className="dashboard-content">
            <div className="main-content-container">
              <div className="main-content-dashboard-div">
                <div>
                  <h2 className="main-content-dashboard-h2">
                    Hello, {userProfile?.first_name} {userProfile?.last_name} 👋
                  </h2>
                  <p className="main-content-dashboard-p">
                    Here's what's going on today.
                  </p>
                </div>
                <div className="dashboard-bell-search-icons">
                  <TbSearch />
                  <TbBell />
                </div>
              </div>

              <div className="div-split-tickets">
                {dashboardData.map((item, index) => (
                  <div key={index} className="div-dashboard-overdue">
                    <div className="div-overdue-icons">
                      <p className="overdue-texts-dashboard">{item.title}</p>
                      <span style={{ fontSize: 24 }}>
                        <TbTicket />
                      </span>
                    </div>
                    <div className="div-main-overdue-image">
                      <img
                        src={item.image}
                        className="image-main-overdue-image"
                        alt={item.title}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="div-split-tickets">
                <FilterBar />
              </div>
              <div>
                <HistoryLog data={historyLogData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {userProfile?.org_setup_complete ? null : (
        <div>
          <Modal
            isOpen={isModalOpen}
            onOpen={openModal}
            onClose={closeModal}
            formContent={formContentFirstModal}
          />
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

export default Dashboard;
