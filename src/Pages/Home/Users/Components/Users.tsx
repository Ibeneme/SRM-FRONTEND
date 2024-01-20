import React, { ChangeEvent, useEffect, useState } from "react";
import "./SettingToggle.css";
import Modal from "../../../../components/Modal/Modal";
import "../../Dashboard/Components/Filter.css";
import {
  MdDeleteOutline,
  MdEdit,
  MdOutlineCancel,
  MdSend,
} from "react-icons/md";
import Profilecard from "../../../../assets/Dashboard/ProfileCard.png";
import { IoTicket } from "react-icons/io5";
import FormHeaders from "../../../Auth/Components/FormHeaders";
import PasswordWarning from "../../../../components/Error/ErrorWarning";
import TextInputDashboard from "../../../Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../../Auth/Components/TextInouts/SelectInput";
import HalfButton from "../../../Auth/Components/Buttons/HalfBtn";
import { RootState } from "../../../../../Redux/Store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStaff,
  getAllUsers,
  getDepartments,
  updateStaff,
} from "../../../../../Redux/Profile/Profile";
import { addStaff, resendOTP } from "../../../../../Redux/Auth/Auth";
import ShimmerLoaderPage from "../../../Utils/ShimmerLoader/ShimmerLoaderPage";
import useCustomToasts from "../../../Utils/ToastNotifications/Toastify";

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

interface UsersLogProps {
  data?: UsersLogItem[];
  isLoading?: boolean;
}
interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  reference: string;
}
interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  permission_type: string;
  phone_number: string;
  department: string;
}

interface SubmitErrors {
  email: string;
  first_name: string;
  last_name: string;
  permission_type: string;
  phone_number: string;
  department: string;
}

const UsersLog: React.FC<UsersLogProps> = ({ isLoading }) => {
  const { showSuccessToast, showErrorToast } = useCustomToasts();
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [clickedUser, setClickedUser] = useState<UsersLogItem | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<UsersLogItem | null>(null);
  const [fetchedDepartments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogItem[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [resendTokenLoading, setResendTokenLoading] = useState<
    Record<string, boolean>
  >({});
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    permission_type: "",
    phone_number: "",
    email: "",
    department: "",
    last_name: "",
  });
  const [submitErrors, setSubmitErrors] = useState<SubmitErrors>({
    first_name: "",
    permission_type: "",
    phone_number: "",
    email: "",
    department: "",
    last_name: "",
  });
  const handleFetchUsers = () => {
    dispatch(getAllUsers()).then((result) => {
      setFetchedUsers(result.payload);
      // Assuming result.payload contains the fetched users
      console.log("new-second");
    });
  };
  const resetForms = () => {
    setFormData({
      first_name: "",
      permission_type: "",
      email: "",
      last_name: "",
      phone_number: "", // Include the missing properties
      department: "",
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setPageLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const result = await dispatch(getAllUsers());
        setFetchedUsers(result.payload);
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    //   dispatch(getAllUsers()).then((result) => {
    //     setFetchedUsers(result.payload);
    //   });
    dispatch(getDepartments()).then((result) => {
      setDepartments(result.payload);
    });
  }, [dispatch]);

  const handleResendOTP = (item: UsersLogItem) => {
    console.log(item);
    setResendTokenLoading((prevLoadingMap) => ({
      ...prevLoadingMap,
      [item.id]: true,
    }));
    setTimeout(() => {
      dispatch(resendOTP({ email: item?.email }))
        .then((status) => {
          setResendTokenLoading((prevLoadingMap) => ({
            ...prevLoadingMap,
            [item.id]: false,
          }));
          console.log("Resend OTP success. Status:", status);
          showSuccessToast("Token Resent Successfully");
        })
        .catch((errorStatus) => {
          setResendTokenLoading((prevLoadingMap) => ({
            ...prevLoadingMap,
            [item.id]: false,
          }));
          showErrorToast("An Error Occurred");
          console.error("Error sending Token", errorStatus);
        });
    }, 800);
  };

  // const handleDeleteStaffs = async (item: UsersLogItem) => {
  //   try {
  //     setFormErrors("");
  //     setLoading(true);

  //     const payload = item?.id;

  //     if (payload === undefined) {
  //       setLoading(false);
  //       console.error("Invalid payload for deletion.");
  //       return;
  //     }

  //     const response = await dispatch(deleteStaff(payload));

  //     if (response.payload) {
  //       // Assuming response.payload contains the status code
  //       switch (response.payload) {
  //         case 200:
  //           console.log("Profile successfully deleted:", response);
  //           closeDeleteModal();
  //           break;
  //         case 400:
  //           setFormErrors("Please fill out the form correctly to proceed.");
  //           break;
  //         default:
  //           console.warn("Unexpected response payload:", response);
  //       }
  //     } else {
  //       console.error("Invalid response payload:", response);
  //     }

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error during staff deletion:", error);
  //     // Handle the error as needed
  //   }
  // };

  const handleDeleteStaff = async () => {
    try {
      setFormErrors("");
      setLoading(true);
      const payload = clickedUser?.id;
      console.log(payload, "payload");

      const response = await dispatch(deleteStaff(payload));

      switch (response?.payload) {
        case 200:
          console.log("Profile successfully updated:", response);
          closeDeleteModal();
          setLoading(false);
          break;
        case 400:
          setLoading(false);
          setFormErrors("Please Fill these forms correctly to Proceed.");
          break;
        default:
          setLoading(false);
          console.log("Unexpected response payload:", response);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    if (isLoading === true) {
      handleFetchUsers();
    }
    if (loading === true) {
      handleFetchUsers();
    }
  }, [profile]);

  console.log(loading, "ll");

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
  const handlePermissionTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    console.log(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      permission_type: e.target.value,
    }));
  };

  const openEditModal = (item: UsersLogItem) => {
    console.log("Open Edit Modal for item:", item);
    setEditedUser(item);
    setEditModalOpen(true);
    console.log(editedUser, 'LLL');
    setModalOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    resetForms()
  };

  const openDeleteModal = (item: UsersLogItem) => {
    console.log("Open Delete Modal for item:", item);
    setClickedUser(item);
    setDeleteModalOpen(true);
    setModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setSubmitErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
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
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
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

  const handleSecondModalContinue = async () => {
    setSubmitErrors({
      first_name: "",
      permission_type: "",
      phone_number: "",
      email: "",
      department: "",
      last_name: "",
    });
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.email.trim() ||
      !formData.phone_number.trim()
      //||
      // !formData.department.trim() ||
      // !formData.permission_type.trim()
    ) {
      setSubmitErrors({
        first_name: !formData.first_name.trim() ? "First Name is required" : "",
        last_name: !formData.last_name.trim() ? "Last Name is required" : "",
        email: !formData.email.trim() ? "Email Address is required" : "",
        phone_number: !formData.phone_number.trim()
          ? "Phone Number is required"
          : "",
        department: "", // Set to an empty string or provide a default message
        permission_type: "", // Set to an empty string or provide a default message
      });

      return;
    }

    if (submitErrors) {
      try {
        setLoading(true);
        const response = await dispatch(addStaff(formData));
        console.log("addstaff:", response);
        setLoading(false);
        console.log(submitErrors, "hh");
        switch (response?.payload) {
          case 200:
            console.log("Profile successfully updated:", response);
            setFormData({
              first_name: "",
              permission_type: "",
              email: "",
              last_name: "",
              phone_number: "",
              department: "",
            });
            handleFetchUsers();
            closeSecondModal();
            break;
          case 400:
            setFormErrors("An account with this email already exists.");
            break;
          case 422:
            setSubmitErrors({
              first_name: "Please enter a valid first name.",
              last_name: "Please enter a valid last name.",
              email: "Please enter a valid email address.",
              phone_number: "Please enter a valid phone number.",
              department: "Please enter a valid department.",
              permission_type: "Please select a valid permission type.",
            });
            break;
          default:
            console.log("Unexpected response payload:", response);
            break;
        }
      } catch (error) {
        setLoading(false);
        console.error("Error updating organization profile:", error);
      }
    }
  };

  const handleEditStaff = async () => {
    try {
      setFormErrors("");
      if (formData) {
        setLoading(true);
        const user_id = editedUser?.id;
        const response = await dispatch(
          updateStaff({
            updateStaff: {
              first_name: formData.first_name
                ? formData.first_name
                : editedUser?.first_name,
              last_name: formData.last_name
                ? formData.last_name
                : editedUser?.last_name,
              phone_number: formData.phone_number
                ? formData.phone_number
                : editedUser?.phone_number,
              permission_type: formData.permission_type
                ? formData.permission_type
                : editedUser?.permission_type,
              email: formData.email ? formData.email : editedUser?.email,
            },
            user_id: user_id ?? "",
          })
        );

        console.log("addstaff:", response);
        setLoading(false);
        switch (response?.payload) {
          case 200:
            console.log("Profile successfully updated:", response);
            resetForms();
            handleFetchUsers();
            closeEditModal();
            break;
          case 400:
            setLoading(false);
            setFormErrors("An account with this email already exists.");
            break;
          case 422:
            setLoading(false);
            setFormErrors("Please Enter a Details Correctly to Proceed.");
            break;
          default:
            setLoading(false);
            console.log("Unexpected response payload:", response);
            break;
        }
      } else {
        setFormErrors("Please Enter a Details Correctly to Proceed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating organization profile:", error);
    }
  };

  const formContentSecondModal = (
    <div className="form_content_display-dashboard">
      <br />
      <MdOutlineCancel style={{ fontSize: 24 }} onClick={closeSecondModal} />
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
        error={submitErrors.first_name} // Pass the error message
      />
      <TextInputDashboard
        label="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Enter Users Last Name"
        error={submitErrors.last_name} // Pass the error message
      />
      <TextInputDashboard
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        type="text"
        id="email"
        name="email"
        placeholder="Enter an Email Address"
        error={submitErrors.email} // Pass the error message
      />
      <TextInputDashboard
        label="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        type="text"
        id="phone_number"
        name="phone_number"
        placeholder="Enter a Phone Number"
        error={submitErrors.phone_number} // Pass the error message
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
        >
          {fetchedDepartments?.length > 0
            ? null
            : "Toggle to Departments to Add a Department"}
        </p>
      </div>
      <br /> <br />
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

  const getRandomColor = (letter: string): string => {
    const colors = [
      "orange",
      "#16B4A1",
      "#1962EF",
      "#B45816",
      "#DE4D93",
      "brown",
      "#7B4DDE",
      "#4D64DE",
      "orangered",
    ];
    const index = (letter?.charCodeAt(0) ?? 0) % colors.length;
    return colors[index];
  };

  const openModal = (item: UsersLogItem) => {
    console.log("Clicked item:", item);
    setClickedUser(item);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  if (!fetchedUsers) {
    return <p>No data available.</p>;
  }
  const profilePicStyle: React.CSSProperties = {
    backgroundColor: clickedUser?.image
      ? "transparent"
      : getRandomColor(clickedUser?.first_name[1] as any),
  };

  const content = (
    <div className="amosn5">
      <div className="top-bar">
        <span
          className="close-button"
          onClick={closeModal}
          style={{ fontSize: 24 }}
        >
          &times;
        </span>

        <div className="action-buttons">
          <p
            onClick={() => openDeleteModal(clickedUser!)}
            style={{ cursor: "pointer" }}
          >
            Delete
          </p>
          <p
            onClick={() => openEditModal(clickedUser!)}
            style={{ cursor: "pointer" }}
          >
            Edit
          </p>
        </div>
      </div>
      <div
        className="profile-image-container"
        style={{
          backgroundColor: profilePicStyle.backgroundColor,
          height: 100,
          borderRadius: 8,
          zIndex: -1,
        }}
      >
        <img className="profile-image" src={Profilecard} alt={Profilecard} />
      </div>
      <div
        className="profile-info-container"
        style={{
          marginTop: -32,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="initials-container"
          style={{
            backgroundColor: profilePicStyle.backgroundColor,
            width: 24,
            height: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 488,
            padding: 12,
            color: "white",
            fontSize: 15,
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: 6,
            zIndex: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {clickedUser?.first_name[0]}
          {clickedUser?.last_name[0]}
        </div>
        <div>
          {/* <p className="name-users-style">Name:</p> */}
          <p className="name-users-style-bold">
            {clickedUser?.first_name} {clickedUser?.last_name}
          </p>
        </div>
        <div>
          <p className="name-users-style">{clickedUser?.email}</p>
        </div>
        <div>
          <br />
        </div>
        <div>
          <p className="name-users-style-bold-email">
            {clickedUser?.permission_type.toLowerCase() === "executive"
              ? "Executive"
              : "Support"}{" "}
            Team
          </p>
        </div>
        <br />{" "}
        <div
          style={{
            display: "flex",
            gap: 24,
          }}
        >
          <div className="customStyledBox">
            <IoTicket />
          </div>
          <div
            className="customStyledBox"
            style={{ backgroundColor: "#FDBA10" }}
          >
            <IoTicket />
          </div>
          <div
            className="customStyledBox"
            style={{ backgroundColor: "#0FC136" }}
          >
            <IoTicket />
          </div>
        </div>
        <br />
      </div>
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
        Confirm you want to Delete{" "}
        <span style={{ color: "orangered" }}>
          {clickedUser?.first_name} {""}
          {clickedUser?.last_name}
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
      <div
        style={{
          display: "flex",
          gap: 12,
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <button
            style={{ width: "100%" }}
            onClick={closeDeleteModal}
            className={`custom-containers`}
          >
            Go Back
          </button>
        </div>
        <button
          className={` ${loading ? "loading" : "custom-container"}`}
          onClick={handleDeleteStaff}
        >
          {loading ? (
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Delete User"
          )}
        </button>
      </div>
    </div>
  );

  const editModalContent = (
    <div className="form_content_display-dashboard">
      <br />
      <MdOutlineCancel style={{ fontSize: 24 }} onClick={closeEditModal} />
      <FormHeaders
        activeStepNumber={0}
        totalStepNumbers={0}
        title={`Edit a User,  ${editedUser?.first_name} ${editedUser?.last_name}`}
        //errorText={formErrors}
        accountText={"Edit your user"}
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
        placeholder=" First Name"
      />
      <TextInputDashboard
        label="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Last Name"
      />
      <TextInputDashboard
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        type="text"
        id="email"
        name="email"
        placeholder="Email Address"
      />
      <TextInputDashboard
        label="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        type="text"
        id="phone_number"
        name="phone_number"
        placeholder=" Phone Number"
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
        onClick={handleEditStaff}
        text="Submit"
        loading={loading}
        disabled={loading}
      />
      <div></div>
    </div>
  );

  return (
    <div>
      <div>
        <HalfButton
          onClick={openSecondModal}
          text="+ Add a User"
          loading={loading}
          disabled={loading}
        />
        <div
          className="history-log"
          style={{ padding: 0, margin: 0, width: "100%" }}
        >
          {pageLoading ? (
            <ShimmerLoaderPage />
          ) : (
            <table className="log-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Staff</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Department</th>
                  <th>Permission</th>
                </tr>
              </thead>
              <tbody>
                {fetchedUsers?.map((item, index) => {
                  const profilePicStyle: React.CSSProperties = {
                    backgroundColor: item?.image
                      ? "transparent"
                      : getRandomColor(item?.first_name[1]),
                  };

                  return (
                    <tr key={index} className="log-item">
                      <td>
                        <span className="center-column-span">
                          {item?.image ? (
                            <img
                              className="center-column-image"
                              src={item?.image}
                              alt="item"
                            />
                          ) : (
                            <div
                              className="profile-pic-dashboard"
                              style={profilePicStyle}
                            >
                              {item?.image ? (
                                <img
                                  src={item?.image}
                                  alt={`${item?.first_name} ${item?.last_name}`}
                                />
                              ) : (
                                <span
                                  style={{
                                    color: "#fff",
                                    fontSize: 13,
                                  }}
                                >
                                  {item?.first_name[0]}
                                  {item?.last_name[0]}
                                </span>
                              )}
                            </div>
                          )}
                          <span className="center-column">
                            <p className="center-column-title">
                              {item.first_name} {item?.last_name}
                            </p>
                            <p className="center-column-p">{item.email}</p>
                          </span>
                        </span>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{item.department || "Missing Field"}</td>
                      <td>
                        <p>
                          {item.permission_type.toLowerCase() === "executive"
                            ? "Executive"
                            : "Support"}
                        </p>
                      </td>
                      <td>
                        {item?.email_verified === "True" ? (
                          <p
                            onClick={() => openModal(item)}
                            className="view-tickets"
                          >
                            View User <MdSend />{" "}
                          </p>
                        ) : (
                          <div className="flex">
                            <p
                              className={` ${
                                resendTokenLoading[item.id]
                                  ? "view-tickets-loading"
                                  : "view-tickets-token"
                              }`}
                              onClick={() => handleResendOTP(item)}
                            >
                              {resendTokenLoading[item.id]
                                ? "Loading..."
                                : "Resend Token"}{" "}
                              <MdSend />
                            </p>
                            <MdDeleteOutline
                              className="mddelete"
                              onClick={() => openDeleteModal(item)}
                            />
                            <MdEdit
                              className="mddelete"
                              onClick={() => openEditModal(item)}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            formContent={content}
          />
          <Modal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            formContent={editModalContent}
          />
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            formContent={confirmDeleteModal}
          />
          <Modal
            isOpen={isSecondModalOpen}
            onOpen={openSecondModal}
            onClose={closeSecondModal}
            formContent={formContentSecondModal}
          />
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            formContent={content}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersLog;
