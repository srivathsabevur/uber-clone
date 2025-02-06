import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
const UserSignup = () => {
  const navigate = useNavigate();

  const initialData = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [userSignupData, setUserSignupData] = useState(initialData);
  const { setUser } = useContext(UserDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignupData({ ...userSignupData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      fullname: {
        firstname: userSignupData.firstname,
        lastname: userSignupData.lastname,
      },
      email: userSignupData.email,
      password: userSignupData.password,
    };
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + "/user/register",
      userData
    );
    if (res.status === 201) {
      const data = res.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setUserSignupData(initialData);
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
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              name="firstname"
              value={userSignupData.firstname}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 text-lg px-4 py-2 rounded border placeholder:text-base"
              required
              type="text"
              placeholder="First name"
            />
            <input
              name="lastname"
              value={userSignupData.lastname}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 text-lg px-4 py-2 rounded border placeholder:text-base"
              required
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            name="email"
            value={userSignupData.email}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-6 w-full text-lg px-4 py-2 rounded border placeholder:text-base"
            required
            type="email"
            placeholder="expamle@email.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            name="password"
            value={userSignupData.password}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-6 w-full text-lg px-4 py-2 rounded border placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <button
            className="bg-[#111] text-white mb-3 w-full text-lg px-4 py-2 rounded "
            type="submit"
          >
            Create account
          </button>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/login" className="text-blue-500">
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

export default UserSignup;
