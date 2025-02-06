import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRide, setFinishRide] = useState(false);

  const finishRideRef = useRef(null);

  useGSAP(() => {
    if (finishRide) {
      gsap.to(finishRideRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(finishRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRide]);

  return (
    <div className="h-screen w-screen">
      <div className="fixed top-0 p-6 flex justify-between items-center w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="logo"
        />
        <Link
          to="/captain/logout"
          className="w-10 h-10 bg-white flex items-center justify-center rounded-full "
        >
          <i className="text-xl font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      <div
        onClick={() => setFinishRide(true)}
        className="h-1/5 p-6 bg-yellow-300 rounded-t-lg relative"
      >
        <h4 className="w-[93%] p-1 absolute text-center top-0 ">
          <i className="text-3xl text-black ri-arrow-up-wide-line"></i>
        </h4>
        <div className="flex w-full items-center justify-between mt-6">
          <h4 className="text-xl font-semibold">4 KM Away</h4>
          <button className="bg-green-600 font-semibold text-white p-3 px-4 rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={finishRideRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white  rounded-t-lg"
      >
        <FinishRide setFinishRide={setFinishRide} />
      </div>
    </div>
  );
};

export default CaptainRiding;
