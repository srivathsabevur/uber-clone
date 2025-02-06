import React from "react";

const RidePopUp = ({ setRiderPopupPanel, setConfrimRidePopUp }) => {
  return (
    <div>
      <h4
        onClick={() => setRiderPopupPanel(false)}
        className="w-[93%] p-1 absolute text-center top-0 "
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h4>
      <h2 className="text-2xl font-semibold mb-5">New ride avaliable!</h2>
      <div className="flex items-center justify-between bg-yellow-400 p-3 rounded-lg mt-4">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src=""
            alt="user"
          />
          <h3 className="text-lg font-medium">John Doe</h3>
        </div>
        <h2 className="text-lg font-semibold">2.2 KM</h2>
      </div>
      <div className="flex gap-4 justify-between items-center flex-col ">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">56/7854-H</h3>
              <p className="text-sm text-gray-600 -mt-1">
                Holeraste,Ramanagaram
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium ">56/7854-H</h3>
              <p className="text-sm text-gray-600 -mt-1">
                Holeraste,Ramanagaram
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">₹192.69</h3>
              <p className="text-sm text-gray-600 -mt-1">Cash,Cash</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <button
            onClick={() => setRiderPopupPanel(false)}
            className="bg-gray-300 font-semibold text-gray-700 w-full p-3 px-4 rounded-lg"
          >
            Ignore
          </button>
          <button
            onClick={() => setConfrimRidePopUp(true)}
            className="bg-green-600 font-semibold text-white w-full p-3 px-4 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
