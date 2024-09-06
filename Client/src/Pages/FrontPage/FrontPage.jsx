import React from "react";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div className="w-full bg-[#FEFFDE] h-screen flex items-center justify-center">
  <div className="text-center">
    <div className="text-4xl font-bold">
      Welcome!
    </div>
    <div className="mt-4 text-lg">
      Your feedback is invaluable. Please let us know your thoughts.
    </div>

    <button className="mt-6 bg-[#FFD700] px-4 py-2 rounded-lg text-lg"><Link to={'/feedback'}>Start</Link></button>
  </div>
</div>

  );
};

export default FrontPage;
