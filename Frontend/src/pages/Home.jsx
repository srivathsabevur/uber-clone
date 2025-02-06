import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelOpenRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "75%",
        padding: 24,
      });
      gsap.to(panelOpenRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelOpenRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (lookingForDriver) {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [lookingForDriver]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="uberpng"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute bottom-0 w-full">
        <div className="bg-white h-[25%] p-5 relative">
          <h3 className="text-2xl font-semibold">Find a trip</h3>
          <form>
            <h4
              ref={panelOpenRef}
              onClick={() => setPanelOpen(false)}
              className="absolute opacity-0 top-5 right-5 text-3xl font-medium"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h4>
            <div className="line absolute h-16 w-1 top-[38%] left-10 bg-black rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              className="text-base bg-[#eee] px-12 py-2 mt-5 w-full rounded-lg"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              className="text-base bg-[#eee] px-12 py-2 mt-3 w-full rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-[0%] bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white translate-y-full rounded-t-lg"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white translate-y-full rounded-t-lg"
      >
        <ConfirmRide
          setLookingForDriver={setLookingForDriver}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white translate-y-full rounded-t-lg"
      >
        <LookingForDriver setLookingForDriver={setLookingForDriver} />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white translate-y-full rounded-t-lg"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
