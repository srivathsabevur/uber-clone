import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FinishRide = ({ setFinishRide, ride }) => {
  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }
  return (
    <div>
      <h4
        onClick={() => setFinishRide(false)}
        className="w-[93%] p-1 absolute text-center top-0 "
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h4>
      <h2 className="text-2xl font-semibold mb-5">Finish this ride</h2>
      <div className="flex items-center justify-between border-2 border-yellow-400 p-3 rounded-lg mt-4">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src=""
            alt="user"
          />
          <h3 className="text-lg font-medium">
            {ride?.user?.fullname.firstname +
              " " +
              ride?.user?.fullname.lastname}
          </h3>
        </div>
        <h2 className="text-lg font-semibold">2.2 KM</h2>
      </div>
      <div className="flex gap-4 justify-between items-center flex-col ">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">56/7854-H</h3>
              <p className="text-sm text-gray-600 -mt-1">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium ">56/7854-H</h3>
              <p className="text-sm text-gray-600 -mt-1">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">₹{ride?.fare}</h3>
              <p className="text-sm text-gray-600 -mt-1">Cash,Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            to="/captain-home"
            className="flex justify-center text-lg bg-green-600 mt-5 font-semibold text-white w-full p-3 rounded-lg"
          >
            Finish Ride
          </button>
          {/* <p className="mt-10 text-xs">
            Click on Finish Ride button if you have completed the payment.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
