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
      setLoggedUser(response?.data.user);
    } catch (error) {
      setError(error);
      if (error.response?.status === 401) {
        // 401 is expected for unauthenticated users - not an actual error
        setLoggedUser(null);
        // console.log("User not authenticated (expected)");
      } else {
        // For other errors, log and set error state
        console.error("Authentication error:", error);
        setError(error.message || "Authentication failed");
      }
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
