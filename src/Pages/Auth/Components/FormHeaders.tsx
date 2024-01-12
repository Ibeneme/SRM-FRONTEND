import React, { ReactNode } from "react";
import "../Auth.css";
import "./FormHeader.css";

interface FormHeadersProps {
  title: string;
  accountText?: ReactNode;
  warningText?: string;
  step?: string;
  activeStepNumber: number;
  totalStepNumbers: number;
  errorText?: string;
  success?: string;
  colored?: any;
}

const FormHeaders: React.FC<FormHeadersProps> = ({
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
    <div className="FormHeader">
      {step ? (
        <div
          style={{
            borderRadius: 12,
            marginBottom: -8,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "auto",
          }}
        >
          <p
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              fontSize: 16,
            }}
          >
            {step} {""}
            {activeStepNumber} of {totalStepNumbers}
          </p>
          <div
            style={{
              backgroundColor: "#FFD2C285",
              height: 8,
              width: 100,
              borderRadius: 12,
              marginTop: -8,
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
      <h2 className="auth-title" style={{ fontSize: 16 }}>
        {title}
      </h2>
      <p
        className="auth-text"
        style={{ color: colored ? colored : "#121212", fontSize: 12 }}
      >
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
        null
        // <div
        //   className="create-account-container"
        //   style={{
        //     width: "auto",
        //     backgroundColor: " #ff000012",
        //     borderColor: "red",
        //     borderWidth: 1,
        //     borderStyle: "solid",
        //     borderRadius: 8,
        //     color: "red",
        //     margin: 0,
        //     marginTop: 12,
        //   }}
        // >
        //   <p className="password-warning-fonts">{errorText}</p>
        // </div>
      ) : null}
      {success ? ( null
        // <div
        //   className="create-account-container"
        //   style={{
        //     width: "100%",
        //     backgroundColor: "#00800022",
        //     borderColor: "green",
        //     borderWidth: 1,
        //     borderStyle: "solid",
        //     borderRadius: 8,
        //     color: "green",
        //     margin: 0,
        //     marginTop: 12,
        //   }}
        // >
        //   <p className="password-warning-fonts">{success}</p>
        // </div>
      ) : null} 


      {errorText ? (
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
            {errorText}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default FormHeaders;
