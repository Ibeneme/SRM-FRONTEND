import React, { useState, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import Button from "./Components/Buttons/Button";
import ImageContainer from "../../LandingPage/Section/Section.b/ImageContainer";
import PasswordInput from "./Components/TextInouts/TextInputPasswords";
import FormTop from "./Components/FormTop";
import useNavigateToCreateAccount from "./Hook/useCreateAccount";
import TextInput from "./Components/TextInouts/TextInput";
import { AppDispatch } from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import { setPassword } from "../../../Redux/Auth/Auth";
import Modal from "../../components/Modal/Modal";
import success_image from "../../assets/Illustrations/AuthSuccessImage.png";
interface FormData {
  confirmPassword: string;
  createPassword: string;
}

const SetAddedUserPasswordToken: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const email: string = (location.state as any)?.email || "";
  const [formData, setFormData] = useState<FormData>({
    confirmPassword: "",
    createPassword: "",
  });
  const [errors, setErrors] = useState<{
    createPassword?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormErrors("");
    setErrors({ confirmPassword: "", createPassword: "" });
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleClick = () => {
    openModal();
    setLoading(true);
    setFormErrors("");
    setErrors({ confirmPassword: "", createPassword: "" });
    setTimeout(() => setLoading(false), 2000);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.createPassword)) {
      setErrors({
        createPassword:
          "Password must contain a mix of uppercase, lowercase, numbers, and special characters",
      });
      return;
    }

    if (formData.createPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match" });
      return;
    }
    setErrors({});
    dispatch(
      setPassword({
        email: email,
        password: formData.createPassword,
      })
    )
      .then((response) => {
        setLoading(false);
        console.log("Registration successful", response);

        switch (response?.payload) {
          case 200:
            console.log("success");
            openModal();
            break;
          case 400:
            setFormErrors("Network Error");
            break;
          case 422:
            setFormErrors("An Error Ocurred");
            break;
          default:
            console.log(response?.payload, "lo");
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const formContent = (
    <div className="form_content_display">
      <div className="form_content-orange-background">
        <img
          className="form_content-orange-background-image"
          src={success_image}
          alt={success_image}
        />
      </div>
      <div>
        <h2 className="form_content-h2"> Account Created Successfully</h2>
        <p className="form_content-p">You’ve successfully created an account</p>
      </div>
      <div>
        <button onClick={closeModal} className="form_content_button">
          Proceed to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="auth-container">
      <div className="auth-forms-div">
        <FormTop
          activeStepNumber={0}
          totalStepNumbers={0}
          title="Create a Password"
          accountText={accountText}
          errorText={formErrors}
          warningText="Password must contain a mix of uppercase, lowercase, numbers, and special characters"
        />
        <form className="create-account-container">
          <div>
            <PasswordInput
              label="Create Password"
              value={formData.createPassword}
              onChange={handleChange}
              id="createPassword"
              name="createPassword"
              placeholder="Password"
              required
              error={errors.createPassword}
            />

            <div style={{ visibility: "hidden", height: 1 }}>
              <TextInput
                label="First Name"
                value={"ddd"}
                onChange={handleChange}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <PasswordInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Password"
              required
              error={errors.confirmPassword}
            />
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
      <Modal
        isOpen={isModalOpen}
        onOpen={openModal}
        onClose={closeModal}
        formContent={formContent}
      />
    </div>
  );
};

export default SetAddedUserPasswordToken;
