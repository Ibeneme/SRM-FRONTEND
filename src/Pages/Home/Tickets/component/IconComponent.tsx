import React, { ReactElement } from "react";

type IconProps = {
  icon: ReactElement;
};

const IconComponent: React.FC<IconProps> = ({ icon }) => {
  return (
    <div
      style={{
        marginTop: -21,
        backgroundColor: "#ff6b00",
        width: 16,
        height: 16,
        padding: 12,
        borderRadius: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bouncing-buttons"
    >
      {icon}
    </div>
  );
};

export default IconComponent;
