import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketDataContext = createContext();
const SocketContext = ({ children }) => {
  const socket = io(import.meta.env.VITE_BASE_URL);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Client Connected");
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected");
    });
  }, []);

  const sendMessage = (eventName, message) => {
    socket.emit(eventName, message);
  };

  const receiveMessage = (eventName, callBack) => {
    socket.on(eventName, callBack);
  };

  return (
    <SocketDataContext.Provider value={{ sendMessage, receiveMessage }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketContext;
