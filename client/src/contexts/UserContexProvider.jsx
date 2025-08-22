import Spinner from "@/components/Spinner";
import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with true for initial load
  const [error, setError] = useState(null);

  // Fetch authenticated user
  const fetchAuthenticatedUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${baseUrl}/api/user/authenticate`, {
        withCredentials: true,
      });
      // console.log("response inside context", response);
      setLoggedUser(response.data.user); // Assuming user data is in response.data
    } catch (err) {
      setError(err);
      setLoggedUser(null);
      console.error("Authentication error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  const login = useCallback((user) => {
    setLoggedUser(user);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (loggedUser) {
        await axios.post(
          `${baseUrl}/api/user/logout`,
          {},
          { withCredentials: true }
        );
      }
      setLoggedUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, []);

  // Context value
  const value = {
    loggedUser,
    isLoading,
    error,
    login,
    logout,
    refreshUser: fetchAuthenticatedUser, // Allow manual refresh
  };

  if (isLoading) {
    return <Spinner />;
  }

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserContextProvider;

////////////////////////////////////////////////////////////////////////////////////////////////
// import Spinner from "@/components/Spinner";
// import axios from "axios";
// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

// export const userContext = createContext();

// const UserContexProvider = ({ children }) => {
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   //useEffect for rehydration
//   useEffect(() => {
//     try {
//       setIsLoading(true);
//       const AuthenticatedUser = async () => {
//         const currenUser = await axios.get(`${baseUrl}/api/user/authenticate`, {
//           withCredentials: true,
//         });
//         if (!currenUser) {
//           setLoggedUser(null);
//         }
//         setLoggedUser(currenUser);
//         // console.log("currenUser", currenUser);
//       };
//       AuthenticatedUser();
//     } catch (error) {
//       setLoggedUser(null);
//       console.log("rehydration error", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const login = useCallback((user) => {
//     setLoggedUser(user);
//   }, []);

//   const logOut = useCallback(() => {
//     setLoggedUser(null);
//   }, []);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <userContext.Provider value={{ loggedUser, login, logOut }}>
//       {children}
//     </userContext.Provider>
//   );
// };

// export default UserContexProvider;
