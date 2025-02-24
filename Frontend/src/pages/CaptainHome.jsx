import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfrimRidePopUp from "../components/ConfrimRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketDataContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [riderPopupPanel, setRiderPopupPanel] = useState(false);
  const [confrimRidePopUp, setConfrimRidePopUp] = useState(false);
  const [ride, setRide] = useState(null);
  const [passenger, setPassenger] = useState(null);

  const riderPopupPanelRef = useRef(null);
  const confrimRidePopUpRef = useRef(null);

  const { captain } = useContext(CaptainDataContext);
  const { sendMessage, receiveMessage } = useContext(SocketDataContext);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: captain._id });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          sendMessage("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    const socketCallBack = (ride) => {
      setRide(ride);
      setPassenger(ride.user);
      setRiderPopupPanel(true);
    };

    receiveMessage("new-ride", socketCallBack);
    return () => clearInterval(locationInterval);
  }, []);

  const confirmRide = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/rides/confirm-ride",
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      throw error;
    }
  };

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
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        ref={riderPopupPanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white  rounded-t-lg"
      >
        <RidePopUp
          ride={ride}
          passenger={passenger}
          setConfrimRidePopUp={setConfrimRidePopUp}
          setRiderPopupPanel={setRiderPopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confrimRidePopUpRef}
        className="fixed w-full h-screen z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white  rounded-t-lg"
      >
        <ConfrimRidePopUp
          ride={ride}
          setConfrimRidePopUp={setConfrimRidePopUp}
          setRiderPopupPanel={setRiderPopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
