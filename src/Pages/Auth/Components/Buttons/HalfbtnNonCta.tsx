import React from "react";
import "./Button.css";

interface HalfButtonNonCtaProps {
  onClick?: () => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

const HalfButtonNonCta: React.FC<HalfButtonNonCtaProps> = ({
  onClick,
  text,
  loading,
  disabled,
}) => {
  return (
    <div style={{ width: "100%", justifyContent: "flex-end", display: "flex" }}>
      <button
        style={{
          width: "auto",
          paddingLeft: 36,
          paddingRight: 36,
          borderRadius: 24,
          marginBottom: 12,
        }}
        className={` ${loading ? "loading-half" : "custom-containers"}`}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading ? (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <p style={{ fontSize: 13 }}>{text}</p>
        )}
      </button>
    </div>
  );
};

export default HalfButtonNonCta;
