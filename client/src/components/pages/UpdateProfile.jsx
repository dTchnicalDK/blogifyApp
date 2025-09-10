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
        className="w-full flex flex-col justify-center items-center "
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
                className="rounded-full w-50 h-50 object-cover"
              />

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
                <span>
                  {" "}
                  {moment(loggedUser.updatedAt).format("DD-MM-YYYY HH-MM-SS")}
                </span>
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
          <div className="w-full mx-auto">
            <h2 className=" text-center text-2xl text-slate-600 font-bold capitalize">
              update your profile here
            </h2>
            <div
              id="edit-wrapper"
              className=" profile-photo group relative w-[60vw] flex flex-col items-center "
            >
              <div className="">
                {/* ------------------------dropzone------------------- */}
                <div className="relative size-50 md:size-70 cursor-pointer">
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

                          <div className="size-full absolute z-30 bg-black/50 top-0 left-0 rounded-full hidden justify-center items-center group-hover:flex">
                            <FaRegEdit className=" text-6xl text-white/50 cursor-pointer" />
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
              <div className="form w-full  container p-5">
                <div className="form-group ">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
