import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfrimRidePopUp from "../components/ConfrimRidePopUp";

const CaptainHome = () => {
  const [riderPopupPanel, setRiderPopupPanel] = useState(true);
  const [confrimRidePopUp, setConfrimRidePopUp] = useState(false);

  const riderPopupPanelRef = useRef(null);
  const confrimRidePopUpRef = useRef(null);

  useGSAP(() => {
    if (riderPopupPanel) {
      gsap.to(riderPopupPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(riderPopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [riderPopupPanel]);

  useGSAP(() => {
    if (confrimRidePopUp) {
      gsap.to(confrimRidePopUpRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confrimRidePopUpRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confrimRidePopUp]);

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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        ref={riderPopupPanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white  rounded-t-lg"
      >
        <RidePopUp
          setConfrimRidePopUp={setConfrimRidePopUp}
          setRiderPopupPanel={setRiderPopupPanel}
        />
      </div>

      <div
        ref={confrimRidePopUpRef}
        className="fixed w-full h-screen z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white  rounded-t-lg"
      >
        <ConfrimRidePopUp
          setConfrimRidePopUp={setConfrimRidePopUp}
          setRiderPopupPanel={setRiderPopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
