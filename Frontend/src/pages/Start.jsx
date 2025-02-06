import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1543447706-1eed41fec24b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-8 flex flex-col justify-between">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="uberpng"
        />
        <div className="bg-white px-4 py-4 pb-7">
          <h1 className="text-3xl font-bold">Get Started with Uber</h1>
          <Link
            to="/login"
            className="flex items-center justify-center py-2 bg-black text-white w-full rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
