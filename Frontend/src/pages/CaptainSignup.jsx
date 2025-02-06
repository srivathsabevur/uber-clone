import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const initialData = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    color: "",
    plate: "",
    vehicleType: "",
    capacity: "",
  };

  const [captainSignupData, setCaptainSignupData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaptainSignupData({ ...captainSignupData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: captainSignupData.firstname,
        lastname: captainSignupData.lastname,
      },
      email: captainSignupData.email,
      password: captainSignupData.password,
      vehicle: {
        color: captainSignupData.color,
        plate: captainSignupData.plate,
        vehicleType: captainSignupData.vehicleType,
        capacity: Number(captainSignupData.capacity),
      },
    };
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + "/captain/register",
      captainData
    );
    if (res.status === 201) {
      const data = res.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setCaptainSignupData(initialData);
  };

  return (
    <div className="flex flex-col h-screen justify-between p-7">
      <div>
        <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="uberpng"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">
            What's your Captain's name
          </h3>
          <div className="flex gap-4 mb-6">
            <input
              name="firstname"
              value={captainSignupData.firstname}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 text-lg px-4 py-2 rounded border placeholder:text-base"
              required
              type="text"
              placeholder="First name"
            />
            <input
              name="lastname"
              value={captainSignupData.lastname}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 text-lg px-4 py-2 rounded border placeholder:text-base"
              required
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">
            What's your Captain's email
          </h3>
          <input
            name="email"
            value={captainSignupData.email}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-6 w-full text-lg px-4 py-2 rounded border placeholder:text-base"
            required
            type="email"
            placeholder="expamle@email.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            name="password"
            value={captainSignupData.password}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-6 w-full text-lg px-4 py-2 rounded border placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex flex-col ">
            <div className="flex gap-4 mb-6">
              <input
                name="color"
                value={captainSignupData.color}
                onChange={handleChange}
                className="bg-[#eeeeee] w-1/2 text-lg px-4 py-2 rounded border placeholder:text-base"
                required
                type="text"
                placeholder="Vehicle color"
              />
              <input
                name="plate"
                value={captainSignupData.plate}
                onChange={handleChange}
                className="bg-[#eeeeee] w-1/2 text-lg px-4 py-2 rounded border placeholder:text-base"
                required
                type="text"
                placeholder="Plate number"
              />
            </div>
            <div className="flex gap-4 mb-6">
              <input
                name="capacity"
                value={captainSignupData.capacity}
                onChange={handleChange}
                className="bg-[#eeeeee] w-1/2 text-lg px-4 py-2 rounded border placeholder:text-base"
                required
                type="number"
                placeholder="Capacity"
              />
              <select
                required
                name="vehicleType"
                onChange={handleChange}
                value={captainSignupData.vehicleType}
                className="bg-[#eeeeee] w-1/2 text-lg px-4 py-2 rounded border placeholder:text-base"
              >
                <option hidden>Select type</option>
                <option name="vehicleType" value="car">
                  Car
                </option>
                <option name="vehicleType" value="motorcycle">
                  Motorcycle
                </option>
                <option name="vehicleType" value="auto">
                  Auto
                </option>
              </select>
            </div>
          </div>
          <button
            className="bg-[#111] text-white mb-3 w-full text-lg px-4 py-2 rounded "
            type="submit"
          >
            Create Captain account
          </button>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-gray-800">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
