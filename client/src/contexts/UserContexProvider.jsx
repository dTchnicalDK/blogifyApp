import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

export const userContext = createContext();

const UserContexProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  //useEffect for rehydration
  useEffect(() => {
    try {
      const AuthenticatedUser = async () => {
        const currenUser = await axios.get(`${baseUrl}/api/user/authenticate`, {
          withCredentials: true,
        });
        if (!currenUser) {
          setLoggedUser(null);
        }
        setLoggedUser(currenUser);
        console.log("currenUser", currenUser);
      };
      AuthenticatedUser();
    } catch (error) {
      setLoggedUser(null);
      console.log("rehydration error", error);
    }
  }, []);

  const login = useCallback((user) => {
    setLoggedUser(user);
  }, []);

  const logOut = useCallback(() => {
    setLoggedUser(null);
  }, []);

  return (
    <userContext.Provider value={{ loggedUser, login, logOut }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContexProvider;
