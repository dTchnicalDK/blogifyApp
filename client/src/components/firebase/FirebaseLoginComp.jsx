import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/contexts/UserContexProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../Spinner";
import { useNavigate } from "react-router";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const FirebaseLoginComp = () => {
  const { loggedUser, login, logOut } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

        setIsLoading(true);
        const savedUser = await axios.post(
          `${baseUrl}/api/user/register-google`,
          googleLoggedUser,
          { withCredentials: true }
        );

        toast.success(savedUser.data.msg);
        login(savedUser.data.user);
        navigate("/user");
        // console.log("loggedInUser details", savedUser.data.user);
      } else {
        toast.error("no response from google");
      }
    } catch (error) {
      toast.error(error.message || error.response.message || "gLogin error");
      console.log("google login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div>
      <Button
        onClick={signInWithGoogle}
        variant="ghost"
        className="cursor-pointer"
      >
        <FcGoogle />
        <p className="text-xl">Sign in with Google</p>
      </Button>
    </div>
  );
};

export default FirebaseLoginComp;
