import React from "react";

interface RandomColorComponentProps {
  firstName: string ;
  lastName: string;
  image?: string;
}

const RandomColorComponent: React.FC<RandomColorComponentProps> = ({
  firstName,
  lastName,
  image,
}) => {
  const getRandomColor = (letter: string): string => {
    const colors = [
      "orange",
      "#16B4A1",
      "#1962EF",
      "#B45816",
      "#DE4D93",
      "brown",
      "#7B4DDE",
      "#4D64DE",
      "orangered",
    ];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const profilePicStyle: React.CSSProperties = {
    backgroundColor: image ? "transparent" : getRandomColor(firstName[1] || ""),
  };

  return (
    <div className="profile-pic-dashboard" style={profilePicStyle}>
      {image ? (
        <img src={image} alt={`${firstName} ${lastName}`} />
      ) : (
        <span
          style={{
            color: "#fff",
            fontSize: 13,
          }}
        >
          {firstName[0]}
          {lastName[0]}
        </span>
      )}
    </div>
  );
};

export default RandomColorComponent;
