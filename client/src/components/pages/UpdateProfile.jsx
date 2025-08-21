import { userContext } from "@/contexts/UserContexProvider";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import profileLogo from "@/assets/profileImg.svg";

const UpdateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { loggedUser, login, logout } = useContext(userContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    displayName: "John Doe",
    id: `${loggedUser?._id}`,
    bio: "Software developer with 5 years of experience",
    location: "New York, USA",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!loggedUser) {
    return <Navigate to={"/login"} />;
  }

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/user/update",
        profile,
        { withCredentials: true }
      );
      toast.success(response.data);
    } catch (error) {
      console.log("error while updateting prifile", error);
      toast(error);
    }

    setIsEditing(false);
  };

  return (
    <div>
      <div
        id="wrapper"
        className="w-full flex flex-col justify-center items-start "
      >
        {!isEditing ? (
          <div className="profile-view flex flex-col justify-center items-center">
            <h2 className="m-auto text-2xl text-slate-600 font-bold capitalize">
              your profile informations
            </h2>
            <div className="profile-photo relative">
              <img
                src={loggedUser ? loggedUser.photoURL : profileLogo}
                alt="photo"
                className="rounded-full w-50 h-50 mt-3"
              />
              <FaRegEdit className="absolute right-7 top-7 text-4xl text-slate-100 cursor-pointer" />
              <strong>{loggedUser.email}</strong>
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
                <span> {loggedUser.updatedAt}</span>
              </div>
            </div>

            <Button
              onClick={handleEditClick}
              className="edit-button flex justify-center  mt-3"
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <div className="profile-edit ">
            <h2 className=" text-center text-2xl text-slate-600 font-bold capitalize">
              update your profile here
            </h2>
            <div
              id="edit-wrapper"
              className=" w-full justify-center items-center p-12 min-w-2xl"
            >
              <div className="profile-photo group relative w-1/2 m-auto">
                <div className="w-full rounded-full bg-lime-400">
                  <img
                    src={loggedUser ? loggedUser.photoURL : ""}
                    alt="photo"
                    className="rounded-full w-full "
                  />
                </div>
                <div className="overlay  absolute border-2 border-red-800 bg-black/50 w-full h-full z-30 top-0 left-0 rounded-full hidden justify-center items-center group-hover:flex">
                  <FaRegEdit className=" text-6xl text-white/50 cursor-pointer" />
                </div>
              </div>
              <div className="w-full flex justify-center items-center my-2">
                <strong className="text-slate-600">{loggedUser.email}</strong>
              </div>
              <Separator />
              <div className="form-group">
                <label>id:</label>
                <Input
                  type="text"
                  disabled
                  name="id"
                  value={loggedUser._id}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Name:</label>
                <Input
                  type="text"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Bio:</label>
                <Input
                  type="text"
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Location:</label>
                <Input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className="buttons w-full flex justify-around m-5">
                <Button onClick={handleSave} className="bg-green-700">
                  update Changes
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500"
                >
                  Cancel Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
