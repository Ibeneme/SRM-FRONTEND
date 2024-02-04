import React, { ChangeEvent, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./PaswordInput.css";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  id,
  name,
  placeholder,
  required = false,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="div-for-auth-password-input">
      <label
        className={`${
          error ? "error-auth-label" : "div-for-auth-password-input-label"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="password-input-container">
        <input
          className={`${
            error ? "error-auth-input" : "div-for-auth-password-input-input"
          }`}
          style={{ outline: "none" }}
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={`${"Enter "} ${placeholder}`}
        />
        <div
          className="password-toggle"
          onClick={togglePasswordVisibility}
          role="button"
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </div>
      </div>
      <p className="div-for-auth-text-input-input-error">{error}</p>
    </div>
  );
};

export default PasswordInput;
