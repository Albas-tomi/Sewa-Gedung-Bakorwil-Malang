import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/admin-user").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
