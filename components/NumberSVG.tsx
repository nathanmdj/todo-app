import React from 'react';

// Define TypeScript types for props
type NumberSVGProps = {
  number: number;
  fontSize?: number;
  x?: number;
  y?: number;
  color?: string;
};

// Define the NumberSVG component using TypeScript types
const NumberSVG: React.FC<NumberSVGProps> = ({
  number,
  fontSize = 30, // Default font size is 30 if not provided
  x = 50, // Default x position is 50 if not provided
  y = 50, // Default y position is 50 if not provided
  color = 'black', // Default text color is black if not provided
}) => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {/* Example of a rectangle background */}
      <rect x="0" y="0" width="100" height="100" fill="#f0f0f0" />

      {/* Example of dynamically generated text for the number */}
      <text
        x={x} // Use provided x position or default
        y={y} // Use provided y position or default
        fontSize={fontSize} // Use provided font size or default
        fill={color} // Use provided text color or default
        textAnchor="middle" // Center align text horizontally
        dominantBaseline="middle" // Center align text vertically
      >
        {number}
      </text>
    </svg>
  );
};

export default NumberSVG;
