import { useNavigate } from "react-router-dom";

const useForgotPassword = () => {
  const navigate = useNavigate();

  const navigateForgotPassword = () => {
    navigate("/forgot-password");
  };

  return navigateForgotPassword;
};

export default useForgotPassword;
