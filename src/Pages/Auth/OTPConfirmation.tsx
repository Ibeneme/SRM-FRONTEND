import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import TextInput from "./Components/TextInouts/TextInput";
import Button from "./Components/Buttons/Button";
import ImageContainer from "../../LandingPage/Section/Section.b/ImageContainer";
import FormTop from "./Components/FormTop";
import useLoginAccount from "./Hook/useLoginAccount";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { otpVerification, resendOTP } from "../../../Redux/Auth/Auth";
import { AppDispatch } from "../../../Redux/Store";

interface FormData {
  OTP: string;
  email: string;
}

const OTPConfirmation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState("");
  const [formSucces, setFormSucces] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = (location.state as any)?.email || "";
  console.log(email, "email");
  const [formData, setFormData] = useState<FormData>({
    OTP: "",
    email: " ",
  });

  const [newErrors, setNewErrors] = useState({
    OTP: "",
    email: " ",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormSucces("");
    setFormErrors("");
    setNewErrors((prevErrors) => ({ ...prevErrors, OTP: "" }));
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = () => {
    setFormSucces("");
    setFormErrors("");
    setLoading(true);
    if (!formData.OTP.trim()) {
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        OTP: "OTP is required",
      }));
    } else {
      setNewErrors((prevErrors) => ({ ...prevErrors, OTP: "" }));
      dispatch(otpVerification({ otp: formData.OTP }))
        .then((response) => {
          setLoading(false);
          console.log("Registration successful", response?.payload);
          if (response?.payload === true) {
            navigate("/create-password", { state: { email: formData.OTP } });
          } else {
            setFormErrors("Your token is either expired or invalid.");
            console.log(response?.payload);
          }
          // switch (response?.payload) {
          //   case 200:
          //     navigate("/create-password", { state: { email: email } });
          //     break;
          //   case 400:
          //     setFormErrors("Your token is either expired or invalid.");
          //     break;
          //   case undefined:
          //     setFormErrors("Network Error");
          //     break;
          //   default:
          //     setFormErrors("An Error Occurred");
          //     break;
          // }
        })
        .catch((error) => {
          setLoading(false);
          setFormErrors("Network Error");
          console.log("Registration failed", error);
        });
    }
  };

  const handleResendOtp = () => {
    setLoading(true);
    setFormSucces("");
    setFormErrors("");
    dispatch(resendOTP({ email: "Godwin@antigravitygroup.ng" }))
      .then((response) => {
        setLoading(false);
        console.log("Registration successful", response);
        switch (response?.payload) {
          case 200:
            setFormSucces("A new Otp sent successfully");
            break;
          case 400:
            setFormErrors("An account with this email does not exist");
            break;
          case undefined:
          case 500:
            setFormErrors("Network Error");
            break;
          default:
            setFormErrors("An Error Occurred");
            break;
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Registration failed", error);
      });
  };

  const accountText = (
    <>
      Already Have an Account{" "}
      <span
        onClick={useLoginAccount}
        style={{ color: "orangered", cursor: "pointer" }}
      >
        Login
      </span>
    </>
  );

  return (
    <div className="auth-container">
      <div className="auth-forms-div">
        <FormTop
          step="Step"
          activeStepNumber={2}
          totalStepNumbers={3}
          title="Confirm it's you"
          accountText={accountText}
          errorText={formErrors}
          success={formSucces}
        />
        <form className="create-account-container">
          <TextInput
            label="OTP"
            value={formData.OTP}
            onChange={handleChange}
            type="text"
            id="OTP"
            name="OTP"
            placeholder="OTP"
            required
            error={newErrors.OTP}
          />
          <Button
            onClick={handleClick}
            text="Continue"
            loading={loading}
            disabled={loading}
          />
        </form>

        <p
          style={{ marginTop: -12, fontSize: 14, cursor: "pointer" }}
          onClick={handleResendOtp}
        >
          Didn't get an OTP? Resend Otp
        </p>
      </div>
      <div className="auth-image">
        <ImageContainer />
      </div>
    </div>
  );
};

export default OTPConfirmation;
