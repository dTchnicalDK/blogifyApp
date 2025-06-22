import React, { useContext } from "react";
import { userContext } from "../contexts/UserContexProvider";
import { Link } from "react-router";

const UserProfileImage = () => {
  const { loggedUser } = useContext(userContext);
  return (
    <div className="flex justify-end ">
      {loggedUser ? (
        <Link to={"/udashboard"} className="hover:border-b-0">
          <img
            src="/images/profile.jpg"
            alt="photo"
            className="rounded-full w-16 h-16 "
          />
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserProfileImage;
