import React, { createContext, useCallback, useEffect, useState } from "react";

export const userContext = createContext();

const UserContexProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

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
