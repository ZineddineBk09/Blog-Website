import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-24 w-24 mb-6 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
};

export default LoadingSpinner;
