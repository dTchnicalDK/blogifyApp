import React, { useContext, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { userContext } from "@/contexts/UserContexProvider";
import axios from "axios";
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
      blog: props.blogId,
      comment: text,
    };
    try {
      const response = await axios.post(
        `${baseUrl}/api/comments/create`,
        commentData
      );

      toast.success(response.data.messsage);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.message || error.message);
    }
    // console.log("comment ", commentData);
  };
  return (
    <div className="py-2">
      <h1 className="mb-2.5">you can now type in English</h1>
      <Textarea placeholder="Type here..." onChange={handleChange} />
      <Button className="mt-5.5" onClick={handleSubmit}>
        comment
      </Button>
    </div>
  );
};

export default CommentComp;
