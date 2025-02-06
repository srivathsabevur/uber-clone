import React from "react";

const WaitingForDriver = ({ setWaitingForDriver }) => {
  return (
    <div>
      <h4
        onClick={() => setWaitingForDriver(false)}
        className="w-[93%] p-1 absolute text-center top-0 "
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h4>
      <div className="flex items-center justify-between gap-4">
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">Name of the driver</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">KA42 F1234</h4>
          <p className="text-sm text-gray-600">Maruthi Suzuki Alto</p>
        </div>
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
      </div>
    </div>
  );
};

export default WaitingForDriver;
