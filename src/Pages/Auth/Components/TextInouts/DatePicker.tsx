import React, { ChangeEvent } from "react";
import "./SelectInput.css"; // Assume you have a CSS file for styling

interface DateInputProps {
  label: string;
  date: Date;
  onChange: (date: Date) => void;
  id: string;
  name: string;
  required?: boolean;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  date,
  onChange,
  id,
  name,
  required = false,
  error,
}) => {
  const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) =>
    (currentYear - index).toString()
  );

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(date);
    newDate.setDate(parseInt(e.target.value, 10));
    onChange(newDate);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(date);
    newDate.setMonth(months.indexOf(e.target.value));
    onChange(newDate);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(date);
    newDate.setFullYear(parseInt(e.target.value, 10));
    onChange(newDate);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label className="business-name-label" htmlFor={id}>
        {label}
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <select
          style={{ height: 48, padding: 12, width: "100%" ,}}
          className={`${error ? "error-select-input" : "select-dashboard"}`}
          id={`${id}-day`}
          name={`${name}-day`}
          value={date.getDate().toString()}
          onChange={handleDayChange}
          required={required}
        >
          {days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          style={{ height: 48, padding: 12, minWidth: 120, width: "100%" }}
          className={`${error ? "error-select-input" : "select-dashboard"}`}
          id={`${id}-month`}
          name={`${name}-month`}
          value={months[date.getMonth()]}
          onChange={handleMonthChange}
          required={required}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          style={{ height: 48, padding: 12, width: "100%" }}
          className={`${error ? "error-select-input" : "select-dashboard"}`}
          id={`${id}-year`}
          name={`${name}-year`}
          value={date.getFullYear().toString()}
          onChange={handleYearChange}
          required={required}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <p className="date-input-error">{error}</p>
    </div>
  );
};

export default DateInput;
