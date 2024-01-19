import React from "react";
import "./TextInput.css";

interface DateTextInputProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  error?: string;
  date: Date; // Include the 'date' prop in the interface
}

const DateTextInput: React.FC<DateTextInputProps> = ({
  label,
  value,
  onChange,
  type,
  id,
  name,
  placeholder,
  required = false,
  error,
//   date, // Include 'date' in the component props
}) => {

    // console.log(date)
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
        placeholder={`${"Enter your"} ${placeholder}`}
      />
      <p className="div-for-auth-text-input-input-error">{error}</p>
    </div>
  );
};

export default DateTextInput;
