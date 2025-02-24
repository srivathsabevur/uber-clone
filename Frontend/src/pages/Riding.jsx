import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketDataContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const { ride } = location.state;
  const { receiveMessage } = useContext(SocketDataContext);
  receiveMessage("ride-ended", () => {
    navigator("/home");
  });

  return (
    <div className="h-screen w-screen">
      <Link
        to="/home"
        className="fixed w-10 h-10 right-2 top-2 bg-white flex items-center justify-center rounded-full "
      >
        <i className="text-xl font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between gap-4">
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {ride?.captain?.fullname.firstname +
                " " +
                ride?.captain?.fullname.lastname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">
              {ride?.captain?.vehicle.vehicleType}
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-between items-center flex-col ">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
              <i className="text-lg ri-map-pin-user-line"></i>
              <div>
                <h3 className="text-lg font-medium ">56/7854-H</h3>
                <p className="text-sm text-gray-600 -mt-1">
                  {ride?.destination}
                </p>
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
        </div>
        <button className="bg-green-600 mt-5 font-semibold text-white w-full p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
