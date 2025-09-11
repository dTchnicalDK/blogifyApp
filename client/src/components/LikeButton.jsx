import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const LikeButton = ({ props }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // console.log("props", props);
  const handleLike = async () => {
    try {
      const resDoLike = await axios.post(
        `${baseUrl}/api/likes/add-remove-like`,
        { userId: props.userId, blogId: props.blogId },
        { withCredentials: true }
      );
      // console.log("res do like", resDoLike);
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

  ///////likeCount//////////////
  useEffect(() => {
    const likedCount = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/likes/like-count/${props.blogId}`,
          {
            withCredentials: true,
          }
        );
        setLikeCount(res.data.data);
        // console.log("res", res);
      } catch (error) {
        console.log("like count error", error);
        toast.error(
          error.response.message ||
            error.response.msg ||
            "likeCouldn't be fetched"
        );
      }
    };
    likedCount();
  }, []);

  if (isLiked) {
    return (
      <div
        className=" px-8 rounded-2xl py-1.5 flex justify-center items-center hover:bg-slate-100 cursor-pointer gap-2"
        onClick={handleLike}
      >
        <AiFillLike className="text-2xl  text-green-400" />
        <p className="text-lg">{likeCount}</p>
      </div>
    );
  }
  return (
    <div
      onClick={handleLike}
      className=" px-5 rounded-2xl py-1.5 flex justify-center items-center hover:bg-slate-100 cursor-pointer gap-1 md:gap-2"
    >
      <BiLike className="text-2xl  text-gray-700" />
      <p className="text-lg">{likeCount}</p>
    </div>
  );
};

export default LikeButton;
