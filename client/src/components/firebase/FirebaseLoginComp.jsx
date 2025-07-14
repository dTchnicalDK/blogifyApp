import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "./firebase";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { userContext } from "@/contexts/UserContexProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const FirebaseLoginComp = () => {
  const { loggedUser, login, logOut } = useContext(userContext);

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
        console.log("google response received, trying push data in db");

        const savedUser = await axios.post(
          "http://localhost:2000/api/user/register-google",
          googleLoggedUser,
          { withCredentials: true }
        );
        console.log("res from backend", savedUser.data);
        toast.success(savedUser.data.msg);
        login(savedUser.data.user);
        console.log("user saved in context is:--", loggedUser);
      } else {
        console.log("no response from google");
      }
    } catch (error) {
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
