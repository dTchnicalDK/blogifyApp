import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-green-600"></div>
    </div>
  );
};

export default Spinner;
