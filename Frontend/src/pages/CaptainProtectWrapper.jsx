import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
    axios
      .get(import.meta.env.VITE_BASE_URL + "/captain/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCaptain(res.data.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
