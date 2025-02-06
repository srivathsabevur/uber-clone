import React from "react";

const CaptainDetails = () => {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src=""
            alt="profile"
          />
          <h4 className="text-lg font-medium">Driver Name</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹302.98</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center gap-5 items-start mt-8 bg-gray-100 rounded-2xl p-4">
        <div className="text-center">
          <i className="font-extrathin text-3xl mb-2 ri-time-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours spent</p>
        </div>
        <div className="text-center">
          <i className="font-extrathin text-3xl mb-2 ri-speed-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours spent</p>
        </div>
        <div className="text-center">
          <i className="font-extrathin text-3xl mb-2 ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours spent</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
