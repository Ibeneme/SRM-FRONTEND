import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import TextInput from "./Components/TextInouts/TextInput";
import Button from "./Components/Buttons/Button";
import ImageContainer from "../../LandingPage/Section/Section.b/ImageContainer";
import FormTop from "./Components/FormTop";
import useNavigateToCreateAccount from "./Hook/useCreateAccount";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/Store";
import { forgotPassword } from "../../../Redux/Auth/Auth";

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors("");
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState("");
  const [errors, setErrors] = useState("");

  const handleClick = () => {
    setLoading(true);
    setErrors("");
    dispatch(forgotPassword(formData))
      .then((response) => {
        setLoading(false);
        console.log("Registration successful", response);

        switch (response?.payload) {
          case 200:
            navigate("/otp-reset-password", {
              state: { email: formData.email },
            });
            break;
          case 422:
            setErrors("Please enter a valid email address");
            setFormErrors("Please enter a valid email address");
            break;
          case 401:
            setFormErrors("Your email or password is incorrect.");
            break;
          default:
            setFormErrors("Network Error");
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
      Don't Have an Account{" "}
      <span
        onClick={useNavigateToCreateAccount()}
        style={{ color: "orangered", cursor: "pointer" }}
      >
        Create an Account
      </span>
    </>
  );

  return (
    <div className="auth-container">
      <div className="auth-forms-div">
        <FormTop
          step="Step"
          activeStepNumber={1}
          totalStepNumbers={3}
          title="Forgot Password"
          accountText={accountText}
          errorText={formErrors}
        />
        <form onSubmit={handleSubmit} className="create-account-container">
          <TextInput
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required
            error={errors}
          />
          <Button
            onClick={handleClick}
            text="Continue"
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
      <div className="auth-image">
        <ImageContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
