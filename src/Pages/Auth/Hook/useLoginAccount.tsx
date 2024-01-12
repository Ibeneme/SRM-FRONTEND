
import { useNavigate } from "react-router-dom";

const useLoginAccount = () => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  return navigateLogin;
};

export default useLoginAccount;
