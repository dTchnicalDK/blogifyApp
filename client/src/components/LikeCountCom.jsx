import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegComments } from "react-icons/fa6";
import { GrLike } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const LikeCountCom = ({ props }) => {
  const [likeCount, setLikeCount] = useState(0);
  // const [reRender, setReRender] = useState(false);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const resLikeCount = await axios.get(
          `${baseUrl}/api/likes/like-count/${props.blogId}`
        );
        setLikeCount(resLikeCount.data.data);
        // console.log("like count ..", likeCount);
        // setBlogObj(blog.data.data);
      } catch (error) {
        console.log("fe likeCount fetching error", error);
        toast.error(
          error.response?.message ||
            error.message ||
            "error fetching like count"
        );
      }
    };
    if (props) {
      fetchLikeCount();
    }
  }, []);

  return (
    <div id="right" className="flex justify-between items-center gap-2">
      <span>
        <FaRegComments className="inline-block m-1" />
        <small>{props?.commentCount}</small>
      </span>{" "}
      <span>
        <GrLike className="inline-block m-1" />
        <small>{likeCount}</small>
      </span>
    </div>
  );
};

export default LikeCountCom;
