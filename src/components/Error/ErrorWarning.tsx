import React from "react";

interface PasswordWarningProps {
  formErrors: string;
}

const PasswordWarning: React.FC<PasswordWarningProps> = ({ formErrors }) => {
  return (
    <>
      {formErrors ? (
        <div
          style={{
            backgroundColor: " #ff000012",
            borderColor: "red",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 8,
            color: "red",
            margin: 0,
            marginTop: 36,
            width: "100%",
          }}
        >
          <p className="password-warning-fonts" style={{ fontSize: 12 }}>
            {formErrors}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default PasswordWarning;
