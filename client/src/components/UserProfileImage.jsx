import React, { useContext } from "react";
import { userContext } from "../contexts/UserContexProvider";
import { Link } from "react-router";

const UserProfileImage = () => {
  const { loggedUser } = useContext(userContext);
  return (
    <div className="flex justify-end ">
      {loggedUser ? (
        <Link to={"/user"} className="hover:border-b-0">
          <img
            src={`${loggedUser ? loggedUser.photoURL : "/images/profile.jpg"}`}
            alt="photo"
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
