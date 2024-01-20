import { toast, ToastOptions } from "react-toastify";
import "./Toastify.css";

const useCustomToasts = () => {
  const showSuccessToast = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#fff",
        color: "#078E5D",
      },
      className: "custom-success-toast",
      progressClassName: "custom-progress-success",
      ...options,
    });
  };

  const showErrorToast = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#8E0F07",
        color: "#fff",
      },
      className: "custom-error-toast",
      progressClassName: "custom-progress-error",
      ...options,
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
  };
};

export default useCustomToasts;
