import React, { ChangeEvent, useEffect, useState } from "react";
import "./SettingToggle.css";
import Modal from "../../../../components/Modal/Modal";
import "../../Dashboard/Components/Filter.css";
import { MdEdit, MdOutlineCancel, MdSend } from "react-icons/md";
import FormHeaders from "../../../Auth/Components/FormHeaders";
import PasswordWarning from "../../../../components/Error/ErrorWarning";
import TextInputDashboard from "../../../Auth/Components/TextInouts/TextInputDashboard";
import HalfButton from "../../../Auth/Components/Buttons/HalfBtn";
import DateTextInput from "../../../Auth/Components/TextInouts/DateInput";
import {
  AddFrontDesk,
  getAllUsers,
} from "../../../../../Redux/Profile/Profile";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux/Store";
import ShimmerLoaderPage from "../../../Utils/ShimmerLoader/ShimmerLoaderPage";

export interface UsersLogFDItem {
  department_name: string | null;
  status: string;
  permission_type: string;
  first_name: string;
  title: string;
  email: string;
  image: string;
  last_name: string;
  id: string;
  frontdesk: boolean;
}

interface UsersLogFDProps {
  data: UsersLogFDItem[];
}

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  permission_type: string;
  phone_number: string;
  department: string;
}
const UsersLogFD: React.FC<UsersLogFDProps> = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [clickedUser, setClickedUser] = useState<UsersLogFDItem | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogFDItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [formData, setFormData] = useState<FormData>({
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

  const closeEditModal = () => {
    setEditModalOpen(false);
    handleFetchUsers();
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openModal = (item: UsersLogFDItem) => {
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

  // useEffect(() => {
  //   setPageLoading(true)
  //   dispatch(getAllUsers()).then((result) => {
  //     setPageLoading(false)
  //     setFetchedUsers(result.payload);
  //   });
  // }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setPageLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const result = await dispatch(getAllUsers());
        setFetchedUsers(result.payload);
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleFrontDesk = async () => {
    try {
      setFormErrors("");
      if (formData) {
        setLoading(true);

        const originalDate = new Date(selectedDate);
        const formattedDate = originalDate.toISOString();

        const originalDates = new Date(selectedEndDate);
        const formattedDates = originalDates.toISOString();

        const response = await dispatch(
          AddFrontDesk({
            user_ids: [clickedUser?.id],
            start: formattedDate,
            end: formattedDates,
          })
        );
        console.log("addstaff:", response);
        setLoading(true);
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
            setLoading(false);
            closeModal();
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

  const handleDateChanges: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newDate = new Date(e.target.value);
    console.log(newDate, "newDate");
    setSelectedDate(newDate);
    const originalDate = new Date(newDate);
    const formattedDate = originalDate.toISOString();
    console.log(formattedDate, "formattedDate");
  };
  const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newDates = new Date(e.target.value);
    console.log(newDates, "newDates");
    const originalDate = new Date(newDates);
    const formattedDate = originalDate.toISOString();
    setSelectedEndDate(newDates);
    console.log(formattedDate, "formattedDate");
  };

  const content = (
    <div className="amosn5" style={{ width: "auto" }}>
      <div className="top-bar">
        <span
          className="close-button"
          onClick={closeModal}
          style={{ fontSize: 24 }}
        >
          &times;
        </span>
      </div>
      <FormHeaders
        step=""
        activeStepNumber={0}
        totalStepNumbers={0}
        colored="gray"
        title={`Front Desk ${clickedUser?.first_name} ${" "}  ${
          clickedUser?.last_name
        }`}
        //errorText={formErrors}
        accountText={`Confirm you want to frontdesk ${
          clickedUser?.first_name
        } ${" "}  ${clickedUser?.last_name}`}
      />
      <br />
      <div>
        <DateTextInput
          label="Start Date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChanges}
          id="exampleDate"
          name="exampleDate"
          required
          error=""
          type="date"
          date={selectedDate}
          placeholder="Choose a Start Date"
        />
      </div>
      <div>
        <DateTextInput
          label="End Date"
          value={selectedEndDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          id="exampleDate"
          name="exampleDate"
          required
          error=""
          type="date"
          date={selectedEndDate}
          placeholder="Choose a End Date"
        />
      </div>

      <HalfButton
        onClick={handleFrontDesk}
        text="Submit"
        loading={loading}
        disabled={loading}
      />

      {/* <DateInput
        label="End Date"
        date={selectedDate}
        onChange={handleDateChange}
        id="exampleDate"
        name="exampleDate"
        required
        error=""
      /> */}
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
          {/* {clickedUser} */}
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
            className={` ${loading ? "loading" : "custom-container"}`}
            onClick={closeDeleteModal}
          >
            Go Back
          </button>
        </div>
        <button
          style={{ width: "100%" }}
          className={`custom-containers`}
          onClick={() => console.log("winner")}
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
        title={`Edit a User,  ${clickedUser?.first_name} ${clickedUser?.last_name}`}
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
      <br /> <br />
      <HalfButton
        onClick={() => console.log("done")}
        text="Submit"
        loading={loading}
        disabled={loading}
      />
      <div></div>
    </div>
  );

  return (
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
            {fetchedUsers
              .filter(
                (user) => user.permission_type.toLowerCase() === "executive"
              )
              .map((item, index) => {
                const profilePicStyle: React.CSSProperties = {
                  backgroundColor: item?.image
                    ? "transparent"
                    : getRandomColor(item?.first_name[1]),
                };

                return (
                  <tr
                    key={index}
                    className="log-item"
                    onClick={() => openModal(item)}
                  >
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
                    <td>{item.department_name || "Missing Field"}</td>
                    <td>
                      <p>
                        {item.permission_type.toLowerCase() === "executive"
                          ? "Executive"
                          : "Support"}
                      </p>
                    </td>
                    <td>
                      {item.frontdesk ? (
                        <p
                          className="view-tickets"
                          style={{ backgroundColor: "#ff7342", color: "#fff" }}
                        >
                          FrontDesk <MdEdit />
                        </p>
                      ) : (
                        <p className="view-tickets">
                          Front Desk this Staff <MdSend />
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} formContent={content} />
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
    </div>
  );
};

export default UsersLogFD;
