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
    <div className=" container flex justify-center items-center">
      <div id="wrapper" className="flex flex-col justify-center items-start ">
        <h2 className="m-auto">Profile Information</h2>

        {!isEditing ? (
          <div className="profile-view flex flex-col justify-center items-center">
            <div className="profile-photo relative">
              <img
                src={loggedUser ? loggedUser.photoURL : ""}
                alt="photo"
                className="rounded-full w-50 h-50 mt-3"
              />
              <FaRegEdit className="absolute right-7 top-7 text-4xl text-slate-100 cursor-pointer" />
              <strong>{loggedUser.email}</strong>
            </div>
            <Separator />
            <div id="informations" className="mt-12">
              <div className="profile-field">
                <strong>Name:</strong> {profile.displayName}
              </div>
              <div className="profile-field">
                <strong>Bio:</strong> {profile.bio}
              </div>
              <div className="profile-field">
                <strong>Location:</strong> {profile.location}
              </div>
              <Separator />
              <div className="profile-field mt-3">
                <strong>Last updated:</strong> {loggedUser.updatedAt}
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
          <div className="profile-edit">
            <div
              id="edit-wrapper"
              className="border-2 border-amber-700 p-12 min-w-2xl"
            >
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

              <Button onClick={handleSave} className="save-button mt-3">
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
