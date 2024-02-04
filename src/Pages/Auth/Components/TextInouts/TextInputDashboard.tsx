import React, { ChangeEvent } from "react";
import "./TextInput.css";

interface TextInputDashboardProps {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  type: string;
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  error?: string;
  height?: boolean;
  placeholderVisible?: boolean;
}
const TextInputDashboard: React.FC<TextInputDashboardProps> = ({
  label,
  value,
  onChange,
  type,
  id,
  name,
  placeholder,
  required = false,
  height,
  error,
  placeholderVisible,
}) => {
  const inputElement = height ? (
    <textarea
      style={{ minHeight: 150 }}
      className={`${
        error ? "error-auth-input" : "div-for-auth-text-input-input"
      }`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={
        placeholderVisible ? `${placeholder}` : `Enter ${placeholder}`
      }
    />
  ) : (
    <input
      className={`${
        error ? "error-auth-input" : "div-for-auth-text-input-input"
      }`}
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={
        placeholderVisible ? `${placeholder}` : `Enter ${placeholder}`
      }
    />
  );

  return (
    <div className="div-for-auth-text-input-div">
      <label className="business-name-label" htmlFor={id}>
        {label}
      </label>
      {inputElement}
      <p className="div-for-auth-text-input-input-error">{error}</p>
    </div>
  );
};

export default TextInputDashboard;
