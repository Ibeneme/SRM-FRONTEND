import { useNavigate } from "react-router-dom";

const useNavigateToCreateAccount = () => {
  const navigate = useNavigate();

  const navigateToCreateAccount = () => {
    navigate("/create-account");
  };

  return navigateToCreateAccount;
};

export default useNavigateToCreateAccount;
