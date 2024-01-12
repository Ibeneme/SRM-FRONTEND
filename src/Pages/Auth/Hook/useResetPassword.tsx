import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const navigate = useNavigate();

  const navigateReset = () => {
    navigate("/reset-password");
  };

  return navigateReset;
};

export default useResetPassword;
