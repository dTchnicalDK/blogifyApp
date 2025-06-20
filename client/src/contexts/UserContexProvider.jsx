import React, { createContext, useState } from "react";

export const userContext = createContext();
const defaultUser = { email: "dharmendra", password: "1234" };

const UserContexProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});

  const login = (user) => {
    return setLoggedUser(user);
  };
  const logOut = () => {
    // const tempVar = "";
    setLoggedUser("");
    console.log("logged out");
  };
  return (
    <userContext.Provider value={{ loggedUser, login, logOut }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContexProvider;
