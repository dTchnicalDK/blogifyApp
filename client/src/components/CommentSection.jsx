import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import defaultAvatar from "@/assets/profileImg.svg";
import DoComment from "./DoComment";
import moment from "moment";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const CommentSection = ({ props, setRefetchCommentCount }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const bottomRef = useRef(null);

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
        // console.log("response comment", fetchedComments.data.data.comments);
        setComments(fetchedComments.data.data);
      } catch (error) {
        console.log("error fetching blogs", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (props._id) {
      fetchComments();
    }
  }, [props._id]);

  useEffect(() => {
    // Scroll to bottom whenever comments change
    // if (comments && comments.length > 0) {
    //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // }
    setRefetchCommentCount((prev) => (prev ? false : true));
  }, [comments]); // Run when comments array changes

  return (
    <div className=" bg-slate-50 relative mt-1  p-5">
      <h1 className="text-2xl p-2 text-slate-800 font-bold">Comments</h1>
      <div className="comment-container container overflow-auto max-h-50 mb-5 p-3 bg-slate-50">
        {/* //////////////////All comments/////////////////////////// */}
        {comments &&
          comments.map((comm) => {
            return (
              <div className="single-comment mb-2.5" key={comm._id}>
                <div className="relative flex justify-start items-start gap-2.5 mb-1 ">
                  <p>
                    <img
                      src={comm.author.photoURL || defaultAvatar}
                      height={"30px"}
                      width={"30px"}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </p>
                  <div className="px-2">
                    <small className="absolute right-0 p-2 text-slate-400">
                      {moment(comm?.createdAt).format("HH:mm  DD-MM-YY")}
                    </small>
                    <p className=" w-full text-blue-900 rounded-2xl p-1 wrap-break-word line-clamp-2">
                      {comm?.comments || ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* ////////comment input section //////////////// */}
      <div className="do-comment-section w-[95%] px-3.5 relative left-2.5 bottom-2.5 ">
        {/* <div className="do-comment-section sticky bottom-0 bg-white pt-3 border-t"> */}
        <div ref={bottomRef}></div>
        <DoComment blogData={{ props }} setComments={setComments} />
      </div>
    </div>
  );
};

export default CommentSection;
