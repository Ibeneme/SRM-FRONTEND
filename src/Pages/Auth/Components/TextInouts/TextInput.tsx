import React, { ChangeEvent } from "react";
import "./TextInput.css";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  type,
  id,
  name,
  placeholder,
  required = false,
  error,
}) => {
  return (
    <div className="div-for-auth-text-input">
      <label
        className={`${
          error ? "error-auth-label" : "div-for-auth-text-input-label"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
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
        placeholder={`${"Enter"} ${placeholder}`}
      />
      <p className="div-for-auth-text-input-input-error">{error}</p>
    </div>
  );
};

export default TextInput;
