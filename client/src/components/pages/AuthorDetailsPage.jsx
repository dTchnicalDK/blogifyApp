import { userContext } from "@/contexts/UserContexProvider";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { Separator } from "../ui/separator";
import profileLogo from "@/assets/profileImg.svg";
import Spinner from "../Spinner";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const AuthorDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser, login, logout } = useContext(userContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loggedUser);
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState("");

  // console.log("before settin loggedUser", loggedUser);
  useEffect(() => {
    console.log("id", id);
    const fetchedUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/user/getuser-byid/${loggedUser._id}`,
          {
            withCredentials: true,
          }
        );
        console.log("response", response);
        setUserDetails(response.data.data);
      } catch (error) {
        toast(response.data.message || "something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchedUser();
    // console.log("set user", userDetails);
  }, []);

  if (!loggedUser) {
    return <Navigate to={"/login"} />;
  }

  if (isLoading || !loggedUser) {
    return <Spinner />;
  }
  return (
    <div>
      {console.log("user", userDetails)}
      <div
        id="wrapper"
        className="w-full flex flex-col justify-center items-center "
      >
        <div className="profile-view flex flex-col justify-center items-center">
          <h2 className="m-auto text-2xl text-slate-600 font-bold capitalize">
            Meet The Author
          </h2>
          <div className="profile-photo relative">
            <img
              src={userDetails ? userDetails.photoURL : profileLogo}
              alt="photo"
              className="rounded-full w-50 h-50 object-cover"
            />

            <strong>{userDetails.email}</strong>
          </div>
          <Separator />
          <div id="informations" className="mt-12 w-full">
            <div className="profile-field flex justify-between items-center">
              <strong>Name:</strong> <span>{profile.displayName}</span>
            </div>
            <div className="profile-field flex justify-between items-center">
              <strong>Bio:</strong> <span> {profile.bio}</span>
            </div>
            <div className="profile-field flex justify-between items-center">
              <strong>Location:</strong> <span> {profile.location}</span>
            </div>
            <Separator />
            <div className="profile-field flex justify-between items-center">
              <strong>Last updated:</strong>{" "}
              <span>
                {" "}
                {moment(userDetails.updatedAt).format("DD-MM-YYYY HH-MM-SS")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
