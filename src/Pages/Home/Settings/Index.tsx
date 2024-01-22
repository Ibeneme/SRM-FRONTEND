import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  getAllUsers,
  getOrganizationProfile,
  updateOrganizationProfile,
} from "../../../../Redux/Profile/Profile";
import Modal from "../../../components/Modal/Modal";
import FormHeaders from "../../Auth/Components/FormHeaders";
import TextInputDashboard from "../../Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../Auth/Components/TextInouts/SelectInput";
import HalfButton from "../../Auth/Components/Buttons/HalfBtn";
import PasswordWarning from "../../../components/Error/ErrorWarning";
import Sidebar from "../Dashboard/SideBar";
import "../Profile/Profile.css";
import SettingsToggle from "./SettingsToggle";
import { MdEdit } from "react-icons/md";
import "./settings.css";
import orgImage from "../../../assets/Dashboard/Company.png";
import UsersLog from "../Users/Components/Users";

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  permission_type: string;
  phone_number: string;
  department: string;
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
}

const Settings: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    permission_type: "",
    phone_number: "",
    email: "",
    department: "",
    last_name: "",
  });

  useEffect(() => {
    if (loading) {
      dispatch(getOrganizationProfile()).then((result) => {
        setOrganizationProfile(result.payload);
      });
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getAllUsers()).then((result) => {
      setFetchedUsers(result.payload);
    });
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload);
    });
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    setSelectedCountry(e.target.value);
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    setSelectedValue(e.target.value);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
    setFormData({
      first_name: "",
      permission_type: "",
      phone_number: "",
      email: "",
      department: "",
      last_name: "",
    });
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
              permission_type: "",
              phone_number: "",
              email: "",
              department: "",
              last_name: "",
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

  const accountSettingsContent = (
    <div>
      <div style={{ backgroundColor: "#fff", padding: 12, borderRadius: 24 }}>
        <UsersLog isLoading={loading} />
      </div>
    </div>
  );
  const orgSettingsContent = (
    <div>
      <div className="acc-settings-row-reverse">
        <div className="account-settings-background">
          <img src={orgImage} width="300" />
        </div>
        <div style={{ padding: 24 }}>
          <div className="slides-settings">
            <p className="slides-settings-p">Business Name</p>
            <p className="slides-settings-bold">{organizationProfile?.name}</p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Country of Operation</p>
            <p className="slides-settings-bold">
              {organizationProfile?.country}
            </p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Email Address</p>
            <p className="slides-settings-bold">{organizationProfile?.email}</p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Staff Count</p>
            <p className="slides-settings-bold">
              {organizationProfile?.staff_count}
            </p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-edit" onClick={openSecondModal}>
              Edit <MdEdit />
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  console.log(fetchedUsers);
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
                      Organisation Settings 👋
                    </h2>
                    <p className="main-content-dashboard-p">
                      Set Up and edit your Organisation
                    </p>
                  </div>{" "}
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
      <Modal
        isOpen={isSecondModalOpen}
        onOpen={openSecondModal}
        onClose={closeSecondModal}
        formContent={formContentFirstModal}
      />
    </div>
  );
};

export default Settings;
