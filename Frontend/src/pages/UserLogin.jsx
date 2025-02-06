import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const navigate = useNavigate();
  const initialData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);

  const { setUser } = useContext(UserDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + "/user/login",
      formData
    );
    if (res.status === 200) {
      const data = res.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setFormData(initialData);
  };

  return (
    <div className="flex flex-col h-screen justify-between p-7">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="uberpng"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
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
            New here?{" "}
            <Link to="/signup" className="text-blue-500">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#5ac06e] flex justify-center items-center text-white mb-2 w-full text-lg px-4 py-2 rounded "
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
