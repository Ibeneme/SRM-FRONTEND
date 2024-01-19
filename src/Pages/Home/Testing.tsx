import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Testing.css'; // Import your CSS file for additional styling

interface YourComponentProps {
  // Your component props
}

const YourComponent: React.FC<YourComponentProps> = ({ /* your props here */ }) => {
  const showSuccessToast = () => {
    toast.success('This is a success toast!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: '#0D7825',
        color: '#ffffff',
      },
      className: 'custom-success-toast',
      progressClassName: 'custom-progress-success',// Add a custom class for the progress bar
    });
  };

  const showErrorToast = () => {
    toast.error('This is an error toast!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: '#781A0D',
        color: '#ffffff',
      },
      className: 'custom-error-toast',
      progressClassName: 'custom-progress-error', // Add a custom class for the progress bar
   });
  };

  // Custom CloseButton component


  return (
    <div>
      {/* Your component code */}
      <button onClick={showSuccessToast}>Show Success Toast</button>
      <button onClick={showErrorToast}>Show Error Toast</button>
    </div>
  );
};

export default YourComponent;
