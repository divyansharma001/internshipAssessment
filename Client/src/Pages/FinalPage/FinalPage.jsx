import React from "react";

const FinalPage = () => {
  return (
    <div className="w-full bg-[#F7EFE5] h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
        <div className="text-4xl font-extrabold text-[#674188] mb-4">Thank You!</div>
        <div className="text-lg text-gray-700 mb-4">
          We greatly appreciate your time and input. Your feedback helps us
          improve and serve you better.
        </div>
        <div className="text-sm text-gray-500">
          You'll be redirected to the welcome screen shortly.
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
