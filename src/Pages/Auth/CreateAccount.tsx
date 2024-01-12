import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import TextInput from "./Components/TextInouts/TextInput";
import Button from "./Components/Buttons/Button";
import ImageContainer from "../../LandingPage/Section/Section.b/ImageContainer";
import FormTop from "./Components/FormTop";
import useLoginAccount from "./Hook/useLoginAccount";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/Store";
import { register } from "../../../Redux/Auth/Auth";

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
}

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState("");
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    first_name?: string;
    last_name?: string;
    company_name?: string;
  }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const newErrors: {
      email?: string;
      first_name?: string;
      last_name?: string;
      company_name?: string;
    } = {};

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = "Business name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    dispatch(register(formData))
      .then((response) => {
        setLoading(false);
        console.log("Registration successful", response);

        switch (response?.payload) {
          case 200:
            navigate("/otp", { state: { email: formData.email } });
            break;

          case 400:
            setFormErrors("An account with this email already exists");
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
      Already Have an Account{" "}
      <span
        onClick={useLoginAccount()}
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
          activeStepNumber={1}
          totalStepNumbers={3}
          title="Create an Account"
          accountText={accountText}
          errorText={formErrors}
        />
        <form className="create-account-container">
          <div className="flex-auth-box">
            <TextInput
              label="First Name"
              value={formData.first_name}
              onChange={handleChange}
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              error={errors.first_name}
            />
            <TextInput
              label="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              error={errors.last_name}
            />
          </div>
          <TextInput
            label="Business Name"
            value={formData.company_name}
            onChange={handleChange}
            type="text"
            id="company_name"
            name="company_name"
            placeholder="Business Name"
            required
            error={errors.company_name}
          />
          <TextInput
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
            error={errors.email}
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

export default CreateAccount;
