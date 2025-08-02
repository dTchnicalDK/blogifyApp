import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { userContext } from "@/contexts/UserContexProvider";
import axios from "axios";
import { MdOutlineForward } from "react-icons/md";
import defaultAvatar from "@/assets/profileImg.svg";
import { Link } from "react-router";
import DoComment from "./DoComment";
import { DialogContent } from "./ui/dialog";

const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const CommentComp = ({ props }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await axios.get(
          `${baseUrl}/api/comments/get-all-comments/${props._id}`,
          { withCredentials: true }
        );

        if (!fetchedComments) {
          toast.error("couldn't load blog, try again!");
        }
        console.log("response comment", fetchedComments.data.data.comments);
        setComments(fetchedComments.data.data);
      } catch (error) {
        console.log("error fetching blogs", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [props._id]);
  return (
    <div className="comment-dialog-container ">
      <div className="comment-container overflow-auto max-h-70 ">
        {/* //////////////////All comments/////////////////////////// */}
        {comments &&
          comments.map((comm) => {
            return (
              <div className="single-comment mb-2.5" key={comm._id}>
                {/* {console.log("comment", comm)} */}
                <div className="flex justify-start items-start gap-1.5 mb-1 ">
                  <p>
                    <img
                      src={comm?.author?.photoURL || defaultAvatar}
                      height={"30px"}
                      width={"30px"}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </p>
                  <p className=" w-full bg-slate-50 rounded-2xl p-1 wrap-break-word line-clamp-2">
                    {comm?.comments || ""}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {/* ////////comment input section //////////////// */}
      <div className="do-comment-section w-[95%] px-3.5 absolute left-2.5 bottom-2.5">
        {/* <div className="do-comment-section sticky bottom-0 bg-white pt-3 border-t"> */}
        <DoComment blogData={{ props }} />
      </div>
    </div>

    // <div className="py-2 ">
    //   <h1 className="my.5">you can now type in English</h1>

    //   <div className="flex justify-between items-center gap-1.5">
    //     <Link>
    //       <div>
    //         <span>
    //           <img
    //             src={props?.blogObj?.author?.photoURL || defaultAvatar}
    //             height={"40px"}
    //             width={"40px"}
    //             alt="avatar"
    //           />
    //         </span>
    //       </div>
    //     </Link>
    //     <div className="relative flex w-full ">
    //       <Textarea
    //         value={text}
    //         placeholder="Type here..."
    //         onChange={handleChange}
    //         className="w-full"
    //       />
    //       <Button
    //         variant="ghost"
    //         onClick={handleSubmit}
    //         className="absolute right-3 top-3"
    //       >
    //         <MdOutlineForward className="text-slate-700" />
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CommentComp;
