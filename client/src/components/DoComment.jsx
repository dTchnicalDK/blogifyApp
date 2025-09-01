import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MdOutlineForward } from "react-icons/md";
import defaultAvatar from "@/assets/profileImg.svg";
import { Link, Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userContext } from "@/contexts/UserContexProvider";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const DoComment = ({ blogData, setComments }) => {
  const [text, setText] = useState();
  const { loggedUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //basic validation
    if (!text) {
      return toast.error("write comment first (frontEnd)");
    }
    if (!loggedUser) {
      navigate("/login");
      return toast.error("Login first!  to comment");
    }
    const commentData = {
      author: loggedUser._id,
      blog: blogData?.props._id,
      comment: text,
    };
    // console.log("commentData", commentData);

    try {
      const response = await axios.post(
        `${baseUrl}/api/comments/create`,
        commentData,
        { withCredentials: true }
      );
      // console.log("blog added", response);
      setComments((prev) => [...prev, response.data.data]);
      toast.success(response.data.messsage);
      setText("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.message || error.message);
    }
    // console.log("comment ", commentData);
  };

  return (
    <div>
      <div className="py-1 ">
        <h1 className="my.5 text-zinc-700">you can now type in English</h1>

        <div className="flex justify-between items-center gap-1.5 mt-3">
          <Link>
            <div>
              <span>
                <img
                  // src={blogData?.props?.author?.photoURL || defaultAvatar}
                  src={loggedUser?.photoURL || defaultAvatar}
                  height={"40px"}
                  width={"40px"}
                  alt="avatar"
                  className="rounded-full"
                />
              </span>
            </div>
          </Link>
          <div className="relative flex w-full bg-white/50">
            <Textarea
              value={text}
              placeholder="Type here..."
              onChange={handleChange}
              className="w-full"
            />
            <Button
              variant="ghost"
              onClick={handleSubmit}
              className="absolute right-3 top-3"
            >
              <MdOutlineForward className="text-slate-700" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoComment;
