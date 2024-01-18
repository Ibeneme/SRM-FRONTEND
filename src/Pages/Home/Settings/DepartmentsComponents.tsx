// DepartmentsComponent.tsx
import React, { useState, useEffect } from "react";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import "./settings.css";

interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string; // Add created_at property
}

interface DepartmentsComponentProps {
  department: Department[];
  isLoading?: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onClickDepartment: (department: Department) => void;
}

const DepartmentsComponent: React.FC<DepartmentsComponentProps> = ({
  department,
  isLoading,
  onEditClick,
  onDeleteClick,
  onClickDepartment,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getColorForLetter = (letter: string): string => {
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
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Sort departments by created_at in descending order
  const sortedDepartments = [...department].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="departments-list-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        sortedDepartments.map((department) => (
          <div
            key={department.id}
            className="department-item"
            onMouseEnter={() => setHoveredId(department.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onClickDepartment(department)}
          >
            <div
              className="department-image"
              style={{
                backgroundColor: getColorForLetter(department.name[0]),
                color: "#ffffff",
              }}
            >
              {department.name.slice(0, 2)}
            </div>
            <span style={{ fontSize: 18, color: "#121212", margin: 0 }}>
              {department.name}
            </span>
            <span
              style={{
                fontSize: 14,
                color: "#808080",
                marginTop: -8,
                lineHeight: 2,
              }}
            >
              {department.description}
            </span>

            {hoveredId === department.id && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 4,
                  gap: 4,
                }}
              >
                <MdEdit className="edit-icon" onClick={onEditClick} />
                <MdDeleteOutline
                  className="edit-icon"
                  onClick={onDeleteClick}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DepartmentsComponent;
