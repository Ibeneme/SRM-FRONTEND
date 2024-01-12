import React, { ReactNode } from "react";
import "../Auth.css";

interface FormTopProps {
  title: string;
  accountText: ReactNode;
  warningText?: string;
  step?: string;
  activeStepNumber: number;
  totalStepNumbers: number;
  errorText?: string;
  success?: string;
  colored?: any;
}

const FormTop: React.FC<FormTopProps> = ({
  title,
  accountText,
  warningText,
  step,
  activeStepNumber,
  totalStepNumbers,
  errorText,
  success,
  colored,
}) => {
  const widthPercentage = (activeStepNumber / totalStepNumbers) * 100;

  return (
    <div className="auth-forms-div">
      {step ? (
        <div
          style={{
            backgroundColor: "#ff5f0517",
            color: "#ff5f05",
            padding: 10,
            borderRadius: 12,
            marginBottom: -8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {step} {""}
            {activeStepNumber} of {totalStepNumbers}
          </p>
          <div
            style={{
              backgroundColor: "#FFD2C2",
              height: 8,
              width: "100%",
              borderRadius: 12,
              marginTop: -2,
            }}
          >
            <div
              style={{
                backgroundColor: "#ff5f05",
                height: 8,
                width: `${widthPercentage}%`,
                borderRadius: 12,
              }}
            ></div>
          </div>
        </div>
      ) : null}
      <h2 className="auth-title">{title}</h2>
      <p className="auth-text" style={{ color: colored ? colored : "#121212" }}>
        {accountText}
      </p>
      {warningText ? (
        <div
          className="create-account-container"
          style={{
            width: "auto",
            backgroundColor: " #ff5f0512",
            borderColor: "red",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 8,
            color: "orangered",
          }}
        >
          <p className="password-warning-fonts">{warningText}</p>
        </div>
      ) : null}
      {errorText ? (
        <div
          className="create-account-container"
          style={{
            width: "auto",
            backgroundColor: " #ff000012",
            borderColor: "red",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 8,
            color: "red",
            margin: 0,
            marginTop: 12,
          }}
        >
          <p className="password-warning-fonts">{errorText}</p>
        </div>
      ) : null}
      {success ? (
        <div
          className="create-account-container"
          style={{
            width: "100%",
            backgroundColor: "#00800022",
            borderColor: "green",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 8,
            color: "green",
            margin: 0,
            marginTop: 12,
          }}
        >
          <p className="password-warning-fonts">{success}</p>
        </div>
      ) : null}
    </div>
  );
};

export default FormTop;
