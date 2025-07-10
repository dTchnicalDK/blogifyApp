import React, { useContext } from "react";
import { userContext } from "../contexts/UserContexProvider";
import { Link } from "react-router";
import userLogo from "@/assets/profileImg.svg";

const UserProfileImage = () => {
  const { loggedUser } = useContext(userContext);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = userLogo;
  };
  return (
    <div className="flex justify-end ">
      {loggedUser ? (
        <Link to={"/user"} className="hover:border-b-0">
          <img
            src={loggedUser.photoURL || userLogo}
            alt={loggedUser.displayName || "User profile"}
            onError={handleImageError}
            className="rounded-full size-12 "
          />
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserProfileImage;
