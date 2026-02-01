import React from "react";

const Spinner = ({ size = 40 }) => {
  return (
    <div
      className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-700"
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;
