import React, { useContext, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { userContext } from "@/contexts/UserContexProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { MdOutlineForward } from "react-icons/md";
import defaultAvatar from "@/assets/profileImg.svg";
import { Link } from "react-router";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

export default function CommentTransLitrate({ props }) {
  const [text, setText] = useState();
  const { loggedUser } = useContext(userContext);

  // Update state on typing
  const handleChange = (e) => setText(e.target.value);

  // Detect Space Key
  const handleKeyDown = async (e) => {
    if (e.key === " ") {
      const words = text.trim().split(" ");
      const lastWord = words[words.length - 1];

      if (lastWord) {
        const hindiWord = await transliterateToHindi(lastWord);
        words[words.length - 1] = hindiWord;
        setText(words.join(" ") + " "); // Add space back
      }
    }
  };

  // Call Google Input Tools API
  const transliterateToHindi = async (word) => {
    try {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${word}&itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`
      );
      const data = await response.json();
      // console.log("response", data);
      if (data[0] === "SUCCESS") {
        return data[1][0][1][0]; // First suggestion
      }
      return word; // fallback if API fails
    } catch {
      return word; // fallback
    }
  };

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
    <div>
      <h2 className="my-.5">Type "aajkal" → get "आजकल" on space key press</h2>
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
        <div className="relative flex w-full">
          <Textarea
            placeholder="Type here..."
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="relative"
          />
          <Button
            variant="ghost"
            onClick={handleSubmit}
            className="absolute right-3 top-3"
          >
            <MdOutlineForward />
          </Button>
        </div>
      </div>
    </div>
  );
}
