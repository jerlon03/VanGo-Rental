
import React from 'react';

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#003459]">
      <div className="w-16 h-16 border-4 border-[#453D3B] border-t-white rounded-full animate-spin"></div>
      <p className="text-white mt-4 text-lg">Loading...</p>
    </div>
  );
};

export default LoadingComponent;
