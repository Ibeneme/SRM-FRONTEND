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
  getProfile,
  updateStaff,
} from "../../../../../Redux/Profile/Profile";
import { addStaff, resendOTP } from "../../../../../Redux/Auth/Auth";
import ShimmerLoaderPage from "../../../Utils/ShimmerLoader/ShimmerLoaderPage";
import useCustomToasts from "../../../Utils/ToastNotifications/Toastify";
import { getUsersTickets } from "../../../../../Redux/Tickets/Tickets";

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

type FormDataWithIndex = FormData & { [key: string]: string };

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
  const profile = useSelector((state: RootState) => state.profile.profile);
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
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogItem[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [resendTokenLoading, setResendTokenLoading] = useState<
    Record<string, boolean>
  >({});
  const [resolvedCount, setResolvedCount] = useState<number>(0);
  const [overdueCount, setOverdueCount] = useState<number>(0);
  const [dueCount, setDueCount] = useState<number>(0);
  // const [closedCount, setClosedCount] = useState<number>(0);
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
    });
  };
  const resetForms = () => {
    setFormData({
      first_name: "",
      permission_type: "",
      email: "",
      last_name: "",
      phone_number: "",
      department: "",
    });
  };

  const [userTickets, setUserTickets] = useState<any[]>([]);
  const fetchUserTickets = (user_id: string) => {
    setLoading(true);
    dispatch(getUsersTickets({ user_id: user_id })) // Dispatching the action
      .then((response: any) => {
        console.log(response?.payload);
        setUserTickets(response?.payload); // Assuming response is an array of user tickets
        setLoading(false);
      })
      .catch((error: any) => {
        // Handle error
        console.error("Error fetching user tickets:", error);
        // setError("Error fetching user tickets");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!Array.isArray(userTickets)) return;

    const resolved = userTickets.filter(
      (ticket) => ticket.status === "resolved"
    ).length;
    const overdue = userTickets.filter(
      (ticket) => ticket.status === "overdue"
    ).length;
    const due = userTickets.filter((ticket) => ticket.status === "due").length;

    setResolvedCount(resolved);
    setOverdueCount(overdue);
    setDueCount(due);
    // setClosedCount(closed);
  }, [userTickets]);

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
    if (clickedUser?.id) {
      fetchUserTickets(clickedUser?.id);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDepartments()).then((result) => {
      setDepartments(result.payload);
    });
  }, [dispatch]);
  useEffect(() => {
    if (isLoading === true) {
      handleFetchUsers();
      dispatch(getProfile()).then(() => {});
    }
    if (loading === true) {
      handleFetchUsers();
      dispatch(getProfile()).then(() => {});
    }
  }, [profile]);

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
  const openEditModal = (item: UsersLogItem) => {
    console.log("Open Edit Modal for item:", item);
    setEditedUser(item);
    setEditModalOpen(true);
    setModalOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    resetForms();
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

  const openModal = (item: UsersLogItem) => {
    setClickedUser(item);
    setModalOpen(true);
    if (item?.id) {
      fetchUserTickets(item?.id);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    //setClickedUser(null);
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
    ) {
      setSubmitErrors({
        first_name: !formData.first_name.trim() ? "First Name is required" : "",
        last_name: !formData.last_name.trim() ? "Last Name is required" : "",
        email: !formData.email.trim() ? "Email Address is required" : "",
        phone_number: !formData.phone_number.trim()
          ? "Phone Number is required"
          : "",
        department: "",
        permission_type: "",
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
      if (!formData) {
        setFormErrors("Please Enter Details Correctly to Proceed.");
        return;
      }
      setLoading(true);
      const user_id = editedUser?.id;
      const response = await dispatch(
        updateStaff({
          updateStaff: {
            first_name: formData.first_name || editedUser?.first_name,
            last_name: formData.last_name || editedUser?.last_name,
            phone_number: formData.phone_number || editedUser?.phone_number,
            permission_type:
              formData.permission_type || editedUser?.permission_type,
            email: formData.email || editedUser?.email,
          },
          user_id: user_id ?? "",
        })
      );
      setLoading(false);
      switch (response?.payload) {
        case 200:
          console.log("Profile successfully updated:", response);
          resetForms();
          handleFetchUsers();
          closeEditModal();
          break;
        case 400:
          setFormErrors("An account with this email already exists.");
          break;
        case 422:
          setFormErrors("Please Enter Details Correctly to Proceed.");
          break;
        default:
          console.log("Unexpected response payload:", response);
          break;
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
      <PasswordWarning formErrors={formErrors} />
      <br />
      <HalfButton
        onClick={handleSecondModalContinue}
        text="Submit"
        loading={loading}
        disabled={loading}
      />
      <br />
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

  if (!fetchedUsers) {
    return <p>No data available.</p>;
  }
  const profilePicStyle: React.CSSProperties = {
    backgroundColor: clickedUser?.image
      ? "transparent"
      : getRandomColor(clickedUser?.first_name[1] as any),
  };

  const content = (
    <div className="amosn5" style={{ minWidth: 360 }}>
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
        style={{ backgroundColor: profilePicStyle.backgroundColor }}
      >
        <img className="profile-image" src={Profilecard} alt={Profilecard} />
      </div>
      <div className="profile-info-container">
        <div
          className="initials-container"
          style={{ backgroundColor: profilePicStyle.backgroundColor }}
          onClick={(e) => e.stopPropagation()}
        >
          {`${clickedUser?.first_name[0]}${clickedUser?.last_name[0]}`}
        </div>
        <div>
          <p className="name-users-style-bold">{`${clickedUser?.first_name} ${clickedUser?.last_name}`}</p>
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
          </p>
        </div>
        <br />
        <div
          className="bounce-container"
          style={{ display: "flex", flexDirection: "row", gap: 24 }}
        >
          <div style={{ color: "#FDBA10" }} className="scale-item">
            <div
              className="customStyledBox bounce-item"
              style={{ backgroundColor: "#ff0000", position: "relative" }}
            >
              <IoTicket />
              <span
                style={{
                  position: "absolute",
                  left: -16,
                  top: -16,
                  backgroundColor: "#ff0000",
                  padding: 6,
                  fontSize: 13,
                  borderRadius: 244,
                  height: 16,
                  width: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "3px solid white",
                }}
              >
                {overdueCount}
              </span>
            </div>
          </div>

          <div style={{ color: "#FDBA10" }}>
            <div
              className="customStyledBox bounce-item"
              style={{ backgroundColor: "#FDBA10", position: "relative" }}
            >
              <IoTicket />
              <span
                style={{
                  position: "absolute",
                  left: -16,
                  top: -16,
                  backgroundColor: "#FDBA10",
                  padding: 6,
                  fontSize: 13,
                  borderRadius: 244,
                  height: 16,
                  width: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "3px solid white",
                }}
              >
                {dueCount}
              </span>
            </div>
          </div>
          <div style={{ color: "#0FC136" }}>
            <div
              className="customStyledBox bounce-item"
              style={{ backgroundColor: "#0FC136", position: "relative" }}
            >
              <IoTicket />
              <span
                style={{
                  position: "absolute",
                  left: -16,
                  top: -16,
                  backgroundColor: "#0FC136",
                  padding: 6,
                  fontSize: 13,
                  borderRadius: 244,
                  height: 16,
                  width: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "3px solid white",
                }}
              >
                {resolvedCount}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p
            style={{
              textDecorationLine: "underline",
              marginTop: 48,
              cursor: "pointer",
              fontSize: 14,
            }}
            onClick={() => console.log("ibenem")}
          >
            View all Tickets
          </p>
        </div>
        <br />
      </div>
    </div>
  );

  const confirmDeleteModal = (
    <div className="form_content_display-dashboard">
      <br />
      <h3 className="clickedUser-h3">
        Confirm you want to Delete{" "}
        <span style={{ color: "orangered" }}>
          {clickedUser?.first_name} {""}
          {clickedUser?.last_name}
        </span>
      </h3>
      <p className="clickedUser-p">This action cannot be undone</p>
      <div className="clickedUser-p-div">
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
          className={`${loading ? "loading" : "custom-container"}`}
          onClick={handleDeleteStaff}
        >
          {loading ? (
            <div className="loader">
              {[...Array(5)].map((_, index) => (
                <div key={index}></div>
              ))}
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
        title={`Edit a User, ${editedUser?.first_name} ${editedUser?.last_name}`}
        accountText={"Edit your user"}
      />
      <PasswordWarning formErrors={formErrors} />
      <br /> <br />
      {["First Name", "Last Name", "Email Address", "Phone Number"].map(
        (label, index) => (
          <TextInputDashboard
            key={index}
            label={label}
            value={
              (formData as FormDataWithIndex)[
                label.toLowerCase().replace(/\s+/g, "_")
              ]
            }
            onChange={handleChange}
            type="text"
            id={label.toLowerCase().replace(/\s+/g, "_")}
            name={label.toLowerCase().replace(/\s+/g, "_")}
            placeholder={label}
          />
        )
      )}
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

                  const isEmailVerified = item?.email_verified === "True";

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
                                <span style={{ color: "#fff", fontSize: 13 }}>
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
                          {item?.permission_type.toLowerCase() === "executive"
                            ? "Executive"
                            : item?.permission_type.toLowerCase() === "support"
                            ? "Support"
                            : item?.permission_type.toLowerCase() === "manager"
                            ? "Manager"
                            : "Unknown"}
                        </p>
                      </td>
                      <td>
                        {isEmailVerified ? (
                          <p
                            onClick={() => openModal(item)}
                            className="view-tickets"
                          >
                            View User <MdSend />
                          </p>
                        ) : (
                          <div className="flex">
                            <p
                              className={`${
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
          {[
            isModalOpen,
            isEditModalOpen,
            isDeleteModalOpen,
            isSecondModalOpen,
            isModalOpen,
          ].map((isOpen, index) => (
            <Modal
              key={index}
              isOpen={isOpen}
              onClose={index === 4 ? closeSecondModal : closeModal}
              formContent={
                index === 1
                  ? editModalContent
                  : index === 2
                  ? confirmDeleteModal
                  : index === 3
                  ? formContentSecondModal
                  : content
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersLog;
