import React from 'react';

interface RandomColorProps {
  firstName: string;
  lastName: string;
}

const getRandomColor = (letter: string): string => {
  const colors = [
    'orange',
    'red',
    'darkblue',
    'green',
    'black',
    'brown',
    'gray',
    'purple',
    'orangered',
  ];
  const index = letter.charCodeAt(0) % colors.length;
  return colors[index];
};

const RandomColor: React.FC<RandomColorProps> = ({ firstName, lastName }) => {
  const initials = (firstName[0] + lastName[0]).toUpperCase();
  const backgroundColor = getRandomColor(initials);

  const profilePicStyle: React.CSSProperties = {
    backgroundColor,
    color: 'white',
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  };

  return (
    <div style={profilePicStyle}>
      <span>{initials}</span>
    </div>
  );
};

export default RandomColor;
