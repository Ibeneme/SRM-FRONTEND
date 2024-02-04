import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getAllUsers,
  getDepartments,
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
import Sidebar from "../Dashboard/SideBar";
import "../Profile/Profile.css";
import SettingsToggle from "./SettingsToggle";
import "./settings.css";
// import orgImage from "../../../assets/Dashboard/Company.png";
// import NoTicketsMessage from "../Dashboard/Components/NoTickets";
import { MdClose, MdOutlineCancel } from "react-icons/md";
import { addStaff } from "../../../../Redux/Auth/Auth";
import departmentsImage from "../../../assets/Dashboard/Departments.png";
import DepartmentsComponent from "./DepartmentsComponents";
//import { useNavigate } from "react-router-dom";
import UsersLogFD, { UsersLogFDItem } from "../Users/Components/UsersFD";
import ShimmerLoaderPage from "../../Utils/ShimmerLoader/ShimmerLoaderPage";
import { TbHistory } from "react-icons/tb";

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  permission_type: string;
  phone_number: string;
  department: string;
}

// interface UsersLogFDItem {
//   department: string | null;
//   status: string;
//   permission_type: string;
//   first_name: string;
//   title: string;
//   email: string;
//   image: string;
//   last_name: string;
//   id: string;
// }

interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  reference: string;
}
interface SubmitErrors {
  first_name: string;
  last_name: string;
}
const Frontdesk: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  //const navigate = useNavigate();
  const [fetchedDepartments, setDepartments] = useState<Department[]>([]);
  const [fetchedSpecificDepartments, setSpecificDepartments] = useState<
    any | null
  >(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeparment, setIsModalDepartment] = useState(false);
  const [isModalDepartmentDelete, setIsModalDepartmentDelete] = useState(false);
  const [isModalDepartmentEdit, setIsModalDepartmentEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogFDItem[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    permission_type: "",
    phone_number: "",
    email: "",
    department: "",
    last_name: "",
  });
  const [editDepartmentErrors, setEditDepartmentErrors] =
    useState<SubmitErrors>({
      first_name: "",
      last_name: "",
    });
  useEffect(() => {
    setPageLoading(true);
    dispatch(getOrganizationProfile()).then((result) => {
      setPageLoading(false);
      setOrganizationProfile(result.payload);
    });

    dispatch(getProfile()).then((result) => {
      setPageLoading(false);
      setUserProfile(result.payload);
    });
    dispatch(getDepartments()).then((result) => {
      setPageLoading(false);
      setDepartments(result.payload);
    });
  }, [dispatch]);

  console.log(pageLoading, "pageLoading");
  useEffect(() => {
    if (loading) {
      dispatch(getDepartments()).then((result) => {
        setDepartments(result.payload);
      });
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
    dispatch(getAllUsers()).then((result) => {
      setFetchedUsers(result.payload);
    });
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setEditDepartmentErrors({
      first_name: "",
      last_name: "",
    });
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

  const openModalDepartment = () => {
    setIsModalDepartment(true);
  };

  const closemodalDepartment = () => {
    setIsModalDepartment(false);
    setFormData({
      first_name: "",
      permission_type: "",
      phone_number: "",
      email: "",
      department: "",
      last_name: "",
    });
  };

  const openModalDepartmentDelete = () => {
    setIsModalDepartmentDelete(true);
  };

  const closemodalDepartmentDelete = () => {
    setIsModalDepartmentDelete(false);
    setFormData({
      first_name: "",
      permission_type: "",
      phone_number: "",
      email: "",
      department: "",
      last_name: "",
    });
  };

  const openModalDepartmentEdit = () => {
    setIsModalDepartmentEdit(true);
  };

  const closemodalDepartmentEdit = () => {
    setIsModalDepartmentEdit(false);
    setFormData({
      first_name: "",
      permission_type: "",
      phone_number: "",
      email: "",
      department: "",
      last_name: "",
    });
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
  const handlePermissionTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    console.log(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      permission_type: e.target.value,
    }));
  };
  const handleCreateDepartment = async () => {
    try {
      setEditDepartmentErrors({
        first_name: "",
        last_name: "",
      });

      const trimmedFormData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
      };

      const isFormDataValid = Object.values(trimmedFormData).every(
        (value) => value.length > 0
      );

      if (!isFormDataValid) {
        setEditDepartmentErrors({
          first_name: !formData.first_name.trim()
            ? "Department Name is required"
            : "",
          last_name: !formData.last_name.trim()
            ? "Department Description is required"
            : "",
        });

        return;
      }

      setFormErrors("");
      setLoading(true);

      const response = await dispatch(
        createDepartment({
          name: trimmedFormData.first_name,
          description: trimmedFormData.last_name,
        })
      );

      setLoading(false);
      switch (response?.payload) {
        case 200:
          console.log("Department successfully created:", response);
          closemodalDepartment();
          setFormData({
            first_name: "",
            permission_type: "",
            phone_number: "",
            email: "",
            department: "",
            last_name: "",
          });
          break;
        case 400:
          setFormErrors("Please Fill these forms correctly to Proceed.");
          break;
        default:
          console.log("Unexpected response payload:", response);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEditDepartments = async () => {
    try {
      setFormErrors("");
      if (formData?.first_name?.length > 0) {
        setLoading(true);

        const payload = {
          editDepartment: {
            name: formData?.first_name,
            description: formData?.last_name,
          },
          department: fetchedSpecificDepartments?.id,
        };

        const response = await dispatch(editDepartment(payload));
        setLoading(false);
        switch (response?.payload) {
          case 200:
            console.log("Profile successfully updated:", response);
            closemodalDepartmentEdit();
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
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      setFormErrors("");
      setLoading(true);
      const department_id = fetchedSpecificDepartments?.id;
      const response = await dispatch(deleteDepartment(department_id));
      setLoading(false);
      switch (response?.payload) {
        case 200:
          console.log("Profile successfully updated:", response);
          closemodalDepartmentDelete();
          setFormData({
            first_name: "",
            permission_type: "",
            phone_number: "",
            email: "",
            department: "",
            last_name: "",
          });
          break;
        case 400:
          setFormErrors("Please Fill these forms correctly to Proceed.");
          break;
        default:
          console.log("Unexpected response payload:", response);
          break;
      }
    } catch (error) {
      setLoading(false);
      //console.error("Error updating organization profile:", error);
    }
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
  const handleSecondModalContinue = async () => {
    try {
      setFormErrors("");
      if (formData) {
        setLoading(true);
        const response = await dispatch(addStaff(formData));
        console.log("addstaff:", response);
        setLoading(false);
        switch (response?.payload) {
          case 200:
            console.log("Profile successfully updated:", response);
            setFormData({
              first_name: "",
              permission_type: "",
              email: "",
              last_name: "",
              phone_number: "", // Include the missing properties
              department: "",
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

  const handleChangeDepartment = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    console.log("Event:", e);
    console.log("Current formData.department:", formData.department);
    const selectedDepartmentId = e.target.value;
    console.log("Selected Department Id:", selectedDepartmentId);
    const selectedDepartment = fetchedDepartments.find(
      (department) => department.id === selectedDepartmentId
    );
    if (selectedDepartment) {
      console.log(
        "Selected Department Name:",
        selectedDepartmentId,
        selectedDepartment.name
      );
    }
    setFormData((prevData) => ({
      ...prevData,
      department: selectedDepartmentId,
    }));
  };

  const handleEditDepartment = () => {
    setIsModalDepartmentEdit(true);
    console.log("Edisgfsss ID:");
  };

  const renderOptions = () => {
    if (fetchedDepartments.length > 0) {
      return fetchedDepartments.map((department) => (
        <option key={department.id} value={department.id}>
          {department.name}
        </option>
      ));
    } else {
      return (
        <option value="" disabled>
          Add a Department
        </option>
      );
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
      <MdOutlineCancel style={{ fontSize: 24 }} onClick={closeModal} />
      <FormHeaders
        activeStepNumber={0}
        totalStepNumbers={0}
        title="Add a User"
        //errorText={formErrors}
        accountText={"Add a User to expand your team"}
      />{" "}
      <PasswordWarning formErrors={formErrors} />
      <br /> <br />
      <TextInputDashboard
        label="First Name"
        value={formData.first_name}
        onChange={handleChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder="Enter Users First Name"
      />
      <TextInputDashboard
        label="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Enter Users Last Name"
      />
      <TextInputDashboard
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        type="text"
        id="email"
        name="email"
        placeholder="Enter an Email Address"
      />
      <TextInputDashboard
        label="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        type="text"
        id="phone_number"
        name="phone_number"
        placeholder="Enter a Phone Number"
      />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label className="business-name-label"> Select a Department </label>

        <select
          style={{ height: 48, padding: 12, width: "100%" }}
          className={`${"select-dashboard"}`}
          value={formData.department}
          onChange={handleChangeDepartment}
        >
          {renderOptions()}
        </select>
        <p
          className="business-name-label"
          style={{
            marginTop: 4,
            marginBottom: -12,
            color: "#FF7342",
            textAlign: "right",
          }}

          // onClick={handleToggleDepartments}
        >
          {fetchedDepartments?.length > 0
            ? null
            : "Toggle to Departments to Add a Department"}
        </p>
      </div>
      <br /> <br />
      {/* <SelectInput
        placeholder="Select a Department"
        label="Choose a Department"
        value={formData.department}
        onChange={handleChangeDepartment}
        id="selectDepartment"
        name="selectDepartment"
        options={renderOptions()}
        required
      /> */}
      <SelectInput
        placeholder="Select a Permission Type"
        label="Choose a Permission Type"
        value={formData.permission_type}
        onChange={handlePermissionTypeChange}
        id="selectPermissionType"
        name="selectPermissionType"
        options={["executive", "manager", "support"]}
        required
      />
      <HalfButton
        onClick={handleSecondModalContinue}
        text="Submit"
        loading={loading}
        disabled={loading}
      />
      <div></div>
    </div>
  );

  const confirmDeleteModal = (
    <div className="form_content_display-dashboard">
      <br />
      <h3
        style={{
          textAlign: "center",
          minWidth: 300,
        }}
      >
        Confirm you want to Delete
        <span style={{ color: "orangered" }}>
          {" "}
          {fetchedSpecificDepartments?.name}
        </span>
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "#808080",
          paddingBottom: 20,
          textAlign: "center",
          marginTop: 0,
          width: "100%",
        }}
      >
        This action cannot be undone
      </p>
      <div style={{ display: "flex", gap: 12, width: "100%" }}>
        <div style={{ width: "100%" }}>
          <button
            style={{ width: "100%" }}
            className={`custom-containers`}
            onClick={closemodalDepartmentDelete}
          >
            Go Back
          </button>
        </div>
        <button
          className={` ${loading ? "loading" : "custom-container"}`}
          onClick={handleDeleteDepartment}
        >
          {loading ? (
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Delete Department"
          )}
        </button>
      </div>
    </div>
  );

  const accountSettingsContent = (
    <div>
      <br />

      {/* {fetchedUsers?.length === 0 ? (
        <NoTicketsMessage
          heading="Whoops... No Users Added yet"
          paragraph="No users created yet"
          imageUrl={orgImage}
          imageAlt="No Tickets"
          buttonText="+ Create a User"
          onClick={() => navigate("/settings")}
        />
      ) : ( */}
      <div>
        <div style={{ backgroundColor: "#fff", padding: 12, borderRadius: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          ></div>

          <UsersLogFD data={fetchedUsers} />
        </div>
      </div>
      {/* // )} */}
    </div>
  );

  const departmentsSettingsContent = (
    <div>
      <div className="org-settings-content">
        {/* <CSVViewer url={usersInCSV} /> */}
        {fetchedDepartments?.length === 0 ? (
          <div className="empty-departments-container">
            <h3>No Departments Created yet</h3>
            <p className="dept-texts">Whoops no have no Departments</p>
            <img src={departmentsImage} width="180" />
            <br />
            <div>
              <HalfButton
                onClick={openModalDepartment}
                text="+ Create a Department"
                loading={loading}
                disabled={loading}
              />{" "}
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                width: "100%",
                borderRadius: 24,
                paddingBottom: 36,
                margin: 0,
              }}
              className="departments-container"
            >
              <div
                className="create-department-button-container"
                style={{
                  padding: 16,
                  marginBottom: -20,
                  marginTop: 24,
                }}
              >
                <HalfButton
                  onClick={openModalDepartment}
                  text="+ Create a Department"
                  loading={loading}
                  disabled={loading}
                />
              </div>

              <div className="">
                {/* <div
                  className="account-settings-background"
                  style={{ width: "50%" }}
                >
                  <img src={departmentsImage} width="300" />
                </div> */}
                <div style={{ display: "flex" }}>
                  <div style={{ padding: 24, width: "auto" }}>
                    <DepartmentsComponent
                      onEditClick={handleEditDepartment}
                      onDeleteClick={openModalDepartmentDelete}
                      department={fetchedDepartments}
                      onClickDepartment={(department) => {
                        setSpecificDepartments(department);
                      }}
                    />
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
          // </div>
          // </div>
        )}
      </div>
    </div>
  );

  const ModalForCreateDepartment = (
    <div className="form_content_display-dashboard">
      <br />
      <MdClose
        style={{ cursor: "pointer", fontSize: 20 }}
        onClick={closemodalDepartment}
      />
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
        placeholder={`A new name for ${fetchedSpecificDepartments?.name}`}
        error={editDepartmentErrors.first_name}
      />
      <TextInputDashboard
        label="Description - 20 words"
        value={
          formData.last_name
            ? formData?.last_name
            : fetchedSpecificDepartments?.description
        }
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder={`A new description for ${fetchedSpecificDepartments?.name}`}
        height
        error={editDepartmentErrors.last_name}
      />
      <HalfButton
        onClick={handleCreateDepartment}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
      <div></div>
    </div>
  );
  const ModalForEditeDepartment = (
    <div className="form_content_display-dashboard">
      <br />
      <MdOutlineCancel
        style={{ fontSize: 24 }}
        onClick={closemodalDepartmentEdit}
      />
      <FormHeaders
        activeStepNumber={0}
        totalStepNumbers={0}
        title={`Edit Department ${fetchedSpecificDepartments?.name}`}
        //errorText={formErrors}
        accountText={"Complete these to edit this department"}
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
        placeholder={`A new name for ${fetchedSpecificDepartments?.name}`}
      />
      <TextInputDashboard
        label="Description - 20 words"
        value={
          formData.last_name
            ? formData?.last_name
            : fetchedSpecificDepartments?.description
        }
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder={`A new description for ${fetchedSpecificDepartments?.name}`}
        height
      />
      <HalfButton
        onClick={handleEditDepartments}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
      <div></div>
    </div>
  );
  return (
    <div className="dashboard-container">
      <Sidebar />
      {pageLoading ? (
        <ShimmerLoaderPage />
      ) : (
        <div className="main-content-container">
          <div className="dashboard-cards-container">
            <div className="dashboard-content">
              <div className="main-content-container">
                <div className="main-content-dashboard-div">
                  <div>
                    <div>
                      <h2 className="main-content-dashboard-h2">
                        Hello, {userProfile?.first_name}{" "}
                        {userProfile?.last_name} 👋
                      </h2>
                      <p className="main-content-dashboard-p">
                        Here's what's going on today.
                      </p>
                    </div>{" "}
                  </div>
                  <div
                    className="dashboard-bell-search-icons"
                    style={{
                      color: "orangered",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      gap: -24,
                      cursor: "pointer",
                    }}
                  >
                    View Frontdesk History
                    <TbHistory
                    //nClick={openModalNotifications}
                    />
                  </div>
                </div>

                <div
                  className="main-content-dashboard-div"
                  style={{ marginTop: 12 }}
                >
                  <SettingsToggle
                    accountSettingsContent={accountSettingsContent}
                    departmentsSettingsContent={departmentsSettingsContent}
                    // onToggleDepartments={handleToggleDepartments}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onOpen={openModal}
        onClose={closeModal}
        formContent={formContentSecondModal}
      />
      <Modal
        isOpen={isModalDeparment}
        onOpen={openModalDepartment}
        onClose={closemodalDepartment}
        formContent={ModalForCreateDepartment}
      />
      <Modal
        isOpen={isModalDepartmentDelete}
        onOpen={openModalDepartmentDelete}
        onClose={closemodalDepartmentDelete}
        formContent={confirmDeleteModal}
      />{" "}
      <Modal
        isOpen={isModalDepartmentEdit}
        onOpen={openModalDepartmentEdit}
        onClose={closemodalDepartmentEdit}
        formContent={ModalForEditeDepartment}
      />
      <Modal
        isOpen={isSecondModalOpen}
        onOpen={openSecondModal}
        onClose={closeSecondModal}
        formContent={formContentFirstModal}
      />
    </div>
  );
};

export default Frontdesk;
