import { userContext } from "@/contexts/UserContexProvider";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import profileLogo from "@/assets/profileImg.svg";
import Dropzone from "react-dropzone";
import Spinner from "../Spinner";
import moment from "moment";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const UpdateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser, login, logout } = useContext(userContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loggedUser);
  const [selectedfile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // console.log("before settin loggedUser", loggedUser);
  useEffect(() => {
    const updateUser = async () => {
      setProfile(loggedUser);
    };
    updateUser();
  }, []);
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

  const handleFileSelect = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !profile?.displayName?.trim() ||
      !profile?.bio?.trim() ||
      !profile?.location.trim()
    ) {
      return toast.error("all fields are mandatory, fill first!");
    }
    let formData = new FormData();
    delete profile.createdAt;
    delete profile.updatedAt;
    delete profile.uid;

    for (const key in profile) {
      formData.append(`${key}`, profile[key]);
    }

    if (selectedfile) {
      formData.append("photoURL", selectedfile);
    }
    const data = Object.fromEntries(formData);
    // console.log("formdata at fe", data);
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${baseUrl}/api/user/update/${loggedUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        login(response.data.data);
      }
      toast.success("profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Frontend update error:", error);
      if (error.response.status == 401) {
        navigate("/login");
        // toast.error(response.data.message);
      }
      toast.error(
        error?.response?.data.message ||
          error.response.data.msg ||
          error.message ||
          "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading || !loggedUser) {
    return <Spinner />;
  }
  return (
    <div>
      <div
        id="wrapper"
        className="w-full flex flex-col justify-center items-center py-5"
      >
        {!isEditing ? (
          // <div className="profile-view flex flex-col justify-center items-center">
          <div className=" profile-photo relative w-5/6 md:w-2/3 rounded-md flex flex-col items-center py-5 bg-white">
            <h2 className="m-auto text-2xl text-slate-600 font-bold capitalize">
              your profile informations
            </h2>
            <div className="profile-photo relative mt-3">
              <img
                src={loggedUser ? loggedUser.photoURL : profileLogo}
                alt="photo"
                className="rounded-full w-50 h-50 object-cover"
              />

              <strong>{loggedUser.email}</strong>
            </div>
            <Separator />
            <div
              id="informations"
              className="form w-full md:w-5/6 container flex flex-col justify-between items-stretch px-5 py-5 bg-white"
            >
              <div className="form-group flex justify-between items-center my-3 ">
                <label>id:</label>
                <div>
                  <Input
                    type="text"
                    disabled
                    name="id"
                    value={loggedUser._id}
                    className={"w-full px-7 md:w-md"}
                  />
                </div>
              </div>
              <div className="form-group flex justify-between items-center my-3">
                <label>Name:</label>
                <div>
                  <Input
                    type="text"
                    name="displayName"
                    value={profile.displayName}
                    disabled
                    className={"w-full px-7 md:w-md"}
                  />
                </div>
              </div>

              <div className="form-group flex justify-between items-center my-3">
                <label>Bio:</label>
                <div>
                  <Input
                    type="text"
                    name="bio"
                    value={profile.bio}
                    disabled
                    className={"w-full px-7 md:w-md"}
                  />
                </div>
              </div>

              <div className="form-group flex justify-between items-center gap-3 my-3">
                <label>Location:</label>
                <div>
                  <Input
                    type="text"
                    name="location"
                    value={profile.location}
                    disabled
                    className={"w-full px-7 md:w-md "}
                  />
                  {/* <span>{profile.location}</span> */}
                </div>
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
          <div className="w-full flex flex-col justify-center items-center py-5">
            <div
              id="edit-wrapper"
              className=" profile-photo relative w-5/6 md:w-2/3 rounded-md flex flex-col items-center  bg-white"
            >
              <h2 className=" text-center text-2xl text-slate-600 font-bold capitalize py-5">
                update your profile here
              </h2>
              <div className="">
                {/* ------------------------dropzone------------------- */}
                <div className="relative size-50 rounded-full md:size-70 cursor-pointer group">
                  <img
                    src={preview ? preview : loggedUser.photoURL || profileLogo}
                    alt="photo"
                    className="w-full h-full rounded-full object-cover"
                  />

                  <Dropzone
                    onDrop={(acceptedFiles) => handleFileSelect(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />

                          <div className="size-50 md:size-70 absolute z-30 bg-black/50 top-0 left-0 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FaRegEdit className=" text-6xl text-white/30 md:text-white/50 cursor-pointer" />
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  {/* ------------------------end------------------- */}
                </div>
              </div>
              <div className="w-full flex justify-center items-center my-2">
                <strong className="text-slate-600">{loggedUser.email}</strong>
              </div>
              <Separator />
              <div className="form w-full md:w-5/6 container flex flex-col justify-between items-stretch px-5 py-5 bg-white">
                <div className="form-group flex justify-between items-center my-3 ">
                  <label>id:</label>
                  <div>
                    <Input
                      type="text"
                      disabled
                      name="id"
                      value={loggedUser._id}
                      className={"w-full px-7 md:w-md"}
                    />
                  </div>
                </div>
                <div className="form-group flex justify-between items-center my-3">
                  <label>Name:</label>
                  <div>
                    <Input
                      type="text"
                      name="displayName"
                      value={profile.displayName}
                      onChange={handleInputChange}
                      className={"w-full px-7 md:w-md"}
                    />
                  </div>
                </div>

                <div className="form-group flex justify-between items-center my-3">
                  <label>Bio:</label>
                  <div>
                    <Input
                      type="text"
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      className={"w-full px-7 md:w-md"}
                    />
                  </div>
                </div>

                <div className="form-group flex justify-between items-center gap-3 my-3">
                  <label>Location:</label>
                  <div>
                    <Input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      className={"w-full px-7 md:w-md"}
                    />
                  </div>
                </div>

                <div className="buttons w-full flex justify-around my-5">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
