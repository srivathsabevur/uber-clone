import React, { createContext, useState } from "react";

export const UserDataContext = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const values = { user, setUser };
  return (
    <div>
      <UserDataContext.Provider value={values}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
