import React, { useState } from "react";
import "./SettingToggle.css";
import Modal from "../../../../components/Modal/Modal";

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

interface UsersLogProps {
  data: UsersLogItem[];
}

const UsersLog: React.FC<UsersLogProps> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [clickedUser, setClickedUser] = useState<UsersLogItem | null>(null);

  const getRandomColor = (letter: string): string => {
    const colors = [
      "orange",
      "red",
      "darkblue",
      "green",
      "black",
      "brown",
      "gray",
      "purple",
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

  if (!data) {
    return <p>No data available.</p>;
  }
  const profilePicStyle: React.CSSProperties = {
    backgroundColor: clickedUser?.image
      ? "transparent"
      : getRandomColor(clickedUser?.first_name[1] as any),
  };

  const content = (
    <div
      onClick={closeModal}
      style={{
        width: 300,
      }}
    >
      <div style={{ marginTop: -24 }}>
        <span className="close-modal-icon-div" onClick={closeModal}>
          &times;
        </span>
        <div
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
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {clickedUser?.first_name[0]}
          {clickedUser?.last_name[0]}
        </div>

        <div>
          <p className="name-users-style">Name:</p>
          <p className="name-users-style-bold">
            {clickedUser?.first_name} {clickedUser?.last_name}
          </p>
        </div>
        <div>
          <p className="name-users-style">Email:</p>
          <p className="name-users-style-bold">{clickedUser?.email}</p>
        </div>
        <div>
          <p className="name-users-style">Department:</p>
          <p className="name-users-style-bold">
            {clickedUser?.department || "Missing Field"}
          </p>
        </div>
        <div>
          <p className="name-users-style"> Permission Type: </p>
          <p className="name-users-style-bold">
            {clickedUser?.permission_type.toLowerCase() === "executive"
              ? "Executive"
              : "Support"}
          </p>
        </div>

        {/* You can display other user details here */}
      </div>
    </div>
  );
  return (
    <div
      className="history-log"
      style={{ padding: 0, margin: 0, width: "100%" }}
    >
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
          {data.map((item, index) => {
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
                  {/* <p className="center-column-p-title"> </p> */}
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
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal} formContent={content} />
    </div>
  );
};

export default UsersLog;
