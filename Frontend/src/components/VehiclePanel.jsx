import React from "react";

const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel }) => {
  return (
    <div>
      <h4
        onClick={() => setVehiclePanel(false)}
        className="w-[93%] p-1 absolute text-center top-0 "
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h4>
      <h2 className="text-2xl font-semibold mb-5">Choose a vehicle</h2>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
        }}
        className="flex items-center justify-between mb-2 w-full p-3 border-2 border-white active:border-black rounded-lg"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberGo
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-base">2mins away</h5>
          <p className="font-normal text-sm text-gray-600">
            Affordable car rides.
          </p>
        </div>
        <h4 className="font-semibold text-lg">₹100</h4>
      </div>
      <div className="flex items-center justify-between mb-2 w-full p-3 border-2 border-white active:border-black rounded-lg">
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-base">2mins away</h5>
          <p className="font-normal text-sm text-gray-600">
            Affordable bike rides.
          </p>
        </div>
        <h4 className="font-semibold text-xl">₹100</h4>
      </div>
      <div className="flex items-center justify-between mb-2 w-full p-3 border-2 border-white active:border-black rounded-lg">
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberAuto
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-base">2mins away</h5>
          <p className="font-normal text-sm text-gray-600">
            Affordable auto rides.
          </p>
        </div>
        <h4 className="font-semibold text-xl">₹100</h4>
      </div>
    </div>
  );
};

export default VehiclePanel;
