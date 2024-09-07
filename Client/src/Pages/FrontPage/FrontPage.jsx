import React from "react";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div className="w-full bg-[#F7EFE5] h-screen flex items-center justify-center">
      <div className="text-center p-6 max-w-lg bg-white rounded-lg shadow-lg">
        <div className="text-5xl font-extrabold text-[#674188] mb-4">
          Welcome!
        </div>
        <div className="mt-2 text-lg text-gray-700">
          Your feedback is invaluable. Please let us know your thoughts.
        </div>
        <Link to={'/feedback'}>
          <button className="mt-6 bg-[#674188] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#553a7b] transition duration-300 ease-in-out">
            Start
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
