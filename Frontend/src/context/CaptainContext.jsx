import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({});
  const values = { captain, setCaptain };

  return (
    <CaptainDataContext.Provider value={values}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
