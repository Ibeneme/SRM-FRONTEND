// useOtp.js
import { useNavigate } from "react-router-dom";

const useOtp = () => {
  const navigate = useNavigate();

  const navigateToOTP = () => {
    navigate("/otp");
  };

  return navigateToOTP;
};

export default useOtp;
