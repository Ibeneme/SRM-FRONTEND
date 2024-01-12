import { useNavigate } from "react-router-dom";

const useCreatePassword = () => {
  const navigate = useNavigate();

  const navigateCreatePassword = () => {
    navigate("/create-password");
  };

  return navigateCreatePassword;
};

export default useCreatePassword;
