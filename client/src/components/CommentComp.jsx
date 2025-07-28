import React, { useContext, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { userContext } from "@/contexts/UserContexProvider";
import axios from "axios";
import { MdOutlineForward } from "react-icons/md";
import defaultAvatar from "@/assets/profileImg.svg";
import { Link } from "react-router";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const CommentComp = ({ props }) => {
  const [text, setText] = useState();
  const { loggedUser } = useContext(userContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //basic validation
    if (!text) {
      return toast.error("write comment first (frontEnd)");
    }
    const commentData = {
      author: loggedUser._id,
      blog: props.blogObj,
      comment: text,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/comments/create`,
        commentData
      );

      toast.success(response.data.messsage);
      setText("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.message || error.message);
    }
    // console.log("comment ", commentData);
  };

  return (
    <div className="py-2 ">
      <h1 className="my.5">you can now type in English</h1>

      <div className="flex justify-between items-center gap-1.5">
        <Link>
          <div>
            <span>
              <img
                src={props?.blogObj?.author?.photoURL || defaultAvatar}
                // {blogObj.author.photoURL}
                height={"40px"}
                width={"40px"}
                alt="avatar"
              />
            </span>
          </div>
        </Link>
        <div className="relative flex w-full ">
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
  );
};

export default CommentComp;
