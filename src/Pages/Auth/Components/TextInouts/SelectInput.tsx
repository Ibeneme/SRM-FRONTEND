import React, { ChangeEvent, ReactNode } from "react";
import "./SelectInput.css";

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void; // Make sure to specify HTMLSelectElement here
  id: string;
  name: string;
  options: (string | ReactNode)[];
  required?: boolean;
  placeholder: string;
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  id,
  name,
  options,
  placeholder,
  required = false,
  error,
}) => {
  const renderOptions = () => {
    if (Array.isArray(options)) {
      return (
        <>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={typeof option === "string" ? option : ""}>
              {option}
            </option>
          ))}
        </>
      );
    } else {
      console.error("Options should be an array.");
      return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label className="business-name-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{ height: 48, padding: 12, width: "100%" }}
        className={`${error ? "error-select-input" : "select-dashboard"}`}
      >
        {renderOptions()}
      </select>
      <p className="div-for-auth-text-input-input-error">{error}</p>
    </div>
  );
};

export default SelectInput;
