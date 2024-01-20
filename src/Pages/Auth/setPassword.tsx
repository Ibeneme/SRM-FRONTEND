import React, { useState, ChangeEvent, useEffect } from "react";
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
import { otpVerification } from "../../../Redux/Auth/Auth";
import Modal from "../../components/Modal/Modal";
import success_image from "../../assets/Illustrations/AuthSuccessImage.png";
import errorImage from "../../assets/Dashboard/404.png";
interface FormData {
  confirmPassword: string;
  createPassword: string;
}

const SetAddedUserPassword: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  //  const [formErrors, setFormErrors] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const email: string = (location.state as any)?.email || "";
  const [formData, setFormData] = useState<FormData>({
    confirmPassword: "",
    createPassword: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    console.log(token);

    dispatch(
      otpVerification({
        otp: token,
      })
    )
      .then((response) => {
        setLoading(false);
        console.log("Registration successful", response);

        if (response?.payload?.user) {
          console.log(response?.payload?.user?.email);
          const email = response?.payload?.user?.email;
          navigate("/user-set-password", { state: { email } });
        } else {
          console.log(response?.payload);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Registration failed", error);
      });
  }, [location.search]);

  const [errors, setErrors] = useState<{
    createPassword?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors({ confirmPassword: "", createPassword: "" });
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
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
          title="Whoops... An Error Occurred"
          accountText={accountText}
        />
        <br /> <br />
        <form className="create-account-container">
          <div>
            <div style={{ display: "none" }}>
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
            <img src={errorImage} style={{ maxWidth: 280 }} alt={errorImage} />
            <br /> <br /> <br />
            <Button
              onClick={() => navigate("/create-account")}
              text="Proceed to Create Account"
              loading={loading}
              disabled={loading}
            />
          </div>
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

export default SetAddedUserPassword;
