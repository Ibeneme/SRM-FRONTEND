// Button.tsx
import React from "react";
import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  loading,
  disabled,
}) => {
  return (
    <button
      style={{ cursor: "pointer" }}
      className={` ${loading ? "loading" : "custom-container"}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
