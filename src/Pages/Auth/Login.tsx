import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import TextInput from "./Components/TextInouts/TextInput";
import Button from "./Components/Buttons/Button";
import ImageContainer from "../../LandingPage/Section/Section.b/ImageContainer";
import PasswordInput from "./Components/TextInouts/TextInputPasswords";
import FormTop from "./Components/FormTop";
import useNavigateToCreateAccount from "./Hook/useCreateAccount";
import useForgotPassword from "./Hook/useForgotPassword";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Auth/Auth";
import { AppDispatch } from "../../../Redux/Store";

interface FormData {
  email: string;
  password: string;
}

const LoginAccount: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleClick = () => {
    setLoading(true);
    dispatch(login(formData))
      .then((response) => {
        setLoading(false);
        console.log("Registration successful", response);

        switch (response?.payload) {
          case 200:
            navigate("/home");
            break;
          case 422:
            setFormErrors("Please fill your email and password correctly");
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
      Don't have an account?{" "}
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
          activeStepNumber={1}
          totalStepNumbers={3}
          title="Login Existing Account"
          accountText={accountText}
          errorText={formErrors}
        />
        <form onSubmit={handleSubmit}>
          <br /> <br />
          <TextInput
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <div>
            <PasswordInput
              label="Password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <p
              onClick={useForgotPassword()}
              style={{
                fontSize: 14,
                marginTop: -24,
                textAlign: "right",
                marginBottom: 48,
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </p>
          </div>
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

export default LoginAccount;
