import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseResponseHandlerProps {
  response?: { payload?: number };
  email?: string;
}

interface UseResponseHandler {
  handleResponse: () => void;
  formErrors: string | null;
}

const useResponseHandler = ({ response, email }: UseResponseHandlerProps): UseResponseHandler => {
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleResponse = () => {
    if (response?.payload === 200) {
      navigate("/create-password", { state: { email: email } });
    } else if (response?.payload === 400) {
      // Handle 400 error if needed
    } else if (response?.payload == null || response?.payload === 500) {
      setFormErrors("Network Error");
    } else {
      setFormErrors("An Error Occurred");
    }
  };

  return { handleResponse, formErrors };
};

export default useResponseHandler;
