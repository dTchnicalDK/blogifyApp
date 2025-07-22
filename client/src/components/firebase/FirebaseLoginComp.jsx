import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "./firebase";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/contexts/UserContexProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { Spinner } from "react-bootstrap";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const FirebaseLoginComp = () => {
  const { loggedUser, login, logOut } = useContext(userContext);
  // const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const googleRes = await signInWithPopup(auth, googleProvider);
      if (googleRes) {
        const { uid, email, displayName, photoURL } = googleRes.user;
        const googleLoggedUser = {
          uid,
          email,
          displayName,
          photoURL,
          password: Math.random().toString(),
        };
        // console.log("google response received, trying push data in db");

        const savedUser = await axios.post(
          `${baseUrl}/api/user/register-google`,
          googleLoggedUser,
          { withCredentials: true }
        );
        // console.log("res from backend", savedUser.data);

        toast.success(savedUser.data.msg);
        login(savedUser.data.user);
        // console.log("user saved in context is:--", loggedUser);
      } else {
        toast.error("no response from google");
      }
    } catch (error) {
      toast.error(error.message);
      console.log("google login error", error);
    }
  };
  return (
    <div>
      <Button
        onClick={signInWithGoogle}
        variant="ghost"
        className="cursor-pointer"
      >
        <FcGoogle />
        Sign in with Google
      </Button>
      {/* {loggedUser ? `welcome ${loggedUser}` : "login first"} */}
    </div>
  );
};

export default FirebaseLoginComp;
