import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { SocketDataContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const navigate = useNavigate();

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestion, setPickupSuggestion] = useState([]);
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState("");
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const panelOpenRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const handlePickupSuggestion = async (e) => {
    setPickup(e.target.value);
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/maps/get-suggestions",
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestion(res.data);
    } catch (error) {
      throw error;
    }
  };

  const handleDestinationSuggestion = async (e) => {
    setDestination(e.target.value);
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/maps/get-suggestions",
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestion(res.data);
    } catch (error) {
      throw error;
    }
  };

  const handleFindtrip = async (e) => {
    e.preventDefault();
    if (pickup && destination) {
      setPanelOpen(false);
      setVehiclePanel(true);
    }
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/rides/get-fare",
        {
          params: {
            pickup: pickup,
            destination: destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(res.data);
    } catch (error) {
      throw error;
    }
  };

  const confirmRide = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/rides/create",
        {
          pickup: pickup,
          destination: destination,
          vehicleType: vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setConfirmRidePanel(false);
      setLookingForDriver(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const { user } = useContext(UserDataContext);
  const { sendMessage, receiveMessage } = useContext(SocketDataContext);

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id });

    const socketCallBack = (data) => {
      setRide(data);
      setLookingForDriver(false);
      setWaitingForDriver(true);
    };
    receiveMessage("ride-confirmed", socketCallBack);

    const startRide = (data) => {
      navigate("/riding", { state: { ride: data } });
    };

    receiveMessage("start-ride", startRide);
  }, []);

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
        className=" w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="uberpng"
      />
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      <div className="flex flex-col justify-end h-screen absolute bottom-0 w-full">
        <div className="bg-white h-[30%] p-5 relative">
          <h3 className="text-2xl font-semibold">Find a trip</h3>
          <form onSubmit={handleFindtrip}>
            <h4
              ref={panelOpenRef}
              onClick={() => setPanelOpen(false)}
              className="absolute opacity-0 top-5 right-5 text-3xl font-medium"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h4>
            <div className="line absolute h-16 w-1 top-[31%] left-10 bg-black rounded-full"></div>
            <input
              onClick={() => {
                setActiveField("pickup");
                setPanelOpen(true);
              }}
              onChange={handlePickupSuggestion}
              value={pickup}
              className="text-base bg-[#eee] px-12 py-2 mt-5 w-full rounded-lg"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onClick={() => {
                setActiveField("destination");
                setPanelOpen(true);
              }}
              onChange={handleDestinationSuggestion}
              value={destination}
              className="text-base bg-[#eee] px-12 py-2 mt-3 w-full rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              type="submit"
              className="text-lg px-4 py-2 p-3 bg-black text-white rounded-lg w-full mt-6 font-medium"
            >
              Find Trip
            </button>
          </form>
        </div>
        <div ref={panelRef} className="h-[0%] bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setDestination={setDestination}
            setPickup={setPickup}
            activeField={activeField}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestion
                : destinationSuggestion
            }
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed h-fit w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white translate-y-full rounded-t-lg"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white translate-y-full rounded-t-lg"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white translate-y-full rounded-t-lg"
      >
        <LookingForDriver
          setLookingForDriver={setLookingForDriver}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white translate-y-full rounded-t-lg"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default Home;
