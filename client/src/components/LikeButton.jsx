import React, { useState } from "react";
import { GrLike } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const LikeButton = ({ props }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = async () => {
    try {
      const resDoLike = await axios.post(
        `${baseUrl}/api/likes/add-remove-like`,
        { userId: props.userId, blogId: props.blogId }
      );
      if (resDoLike.data.data == "liked") {
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      }

      if (resDoLike.data.data == "unliked") {
        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      }

      //   console.log("do like ..", resDoLike);
    } catch (error) {
      console.log("fe likeCount fetching error", error);
      toast.error(
        error.response?.message || error.message || "error fetching like count"
      );
    }
  };

  if (isLiked) {
    return (
      <div
        className=" px-8 rounded-2xl py-1.5 flex justify-center items-center hover:bg-slate-100 cursor-pointer"
        onClick={handleLike}
      >
        <AiFillLike />
      </div>
    );
  }
  return (
    <div
      className=" px-8 rounded-2xl py-1.5 flex justify-center items-center hover:bg-slate-100 cursor-pointer"
      onClick={handleLike}
    >
      <BiLike />
    </div>
  );
};

export default LikeButton;
