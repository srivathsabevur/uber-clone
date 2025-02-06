import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const initialData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + "/captain/login",
      formData
    );
    if (res.status === 200) {
      setCaptain(res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/captain-home");
    }
    setFormData(initialData);
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
            What's your Captain's email
          </h3>
          <input
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="bg-[#eeeeee] mb-7 w-full text-lg px-4 py-2 rounded border placeholder:text-base"
            required
            type="email"
            placeholder="expamle@email.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="bg-[#eeeeee] mb-7 w-full text-lg px-4 py-2 rounded border placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <button
            className="bg-[#111] text-white mb-3 w-full text-lg px-4 py-2 rounded "
            type="submit"
          >
            Login
          </button>
          <p className="text-center">
            Join a fleet?{" "}
            <Link to="/captain-signup" className="text-blue-500">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#e8743e] flex justify-center items-center text-white mb-2 w-full text-lg px-4 py-2 rounded "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
