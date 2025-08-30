import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import userLogo from "@/assets/profileImg.svg";
import { userContext } from "@/contexts/UserContexProvider";

const UserCommentsDetails = () => {
  const { loggedUser } = useContext(userContext);
  const [comments, setComments] = useState([]);
  const [isReloading, setIsRealoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

  const handlecommentLink = (blogid) => {
    console.log("comment link", blogid);
    navigate(`/user/single-blogs/${blogid}`);
    toast.info("checkout the comment, clicking comment button!");
  };
  // -----------fetching all comments---------------
  useEffect(() => {
    const getComments = async () => {
      // console.log("userId fe", loggedUser._id);
      try {
        setIsLoading(true);
        const fetchedComments = await axios.get(
          `${baseUrl}/api/comments/get-user-comments/${loggedUser._id}`,
          { withCredentials: true }
        );

        setComments(fetchedComments.data.data);
        toast.success(fetchedComments.data.message);
      } catch (error) {
        console.log("error fetching comments fe", error);
        toast.error(
          error.response.message ||
            error.response.msg ||
            error.message ||
            "comment fetchig error"
        );
      } finally {
        setIsLoading(false);
      }
    };
    getComments();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* {console.log("fetchedComments", comments)} */}
      {comments && comments.length > 0 ? (
        <Table>
          <TableCaption>A list of comments.</TableCaption>
          <TableHeader>
            <TableRow className="bg-sky-300">
              <TableHead className="w-10">Sl No.</TableHead>
              <TableHead>comment</TableHead>
              <TableHead>Blog Title </TableHead>
              <TableHead>user </TableHead>
              <TableHead>userId </TableHead>
              <TableHead> Photo </TableHead>
              <TableHead className="text-right" colsapn="2">
                Action
              </TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>

                  <TableCell>
                    <span
                      onClick={() => handlecommentLink(comment.parentBlog._id)}
                      className="cursor-pointer text-wrap text-sky-900  text-lg"
                    >
                      {comment.comments}
                    </span>
                  </TableCell>

                  <TableCell>
                    {" "}
                    <span className="cursor-pointer text-wrap">
                      {comment.parentBlog.blogTitle}
                    </span>
                  </TableCell>
                  <TableCell>
                    {comment?.author?.displayName || "inActive user"}
                  </TableCell>
                  <TableCell>{comment.author?._id || "inActive"}</TableCell>
                  <TableCell>
                    {
                      <img
                        src={comment.author?.photoURL || userLogo}
                        alt="photo"
                        className="size-10 rounded-full"
                      />
                    }
                  </TableCell>

                  <TableCell className="text-right ">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 btn-hover"
                      onClick={() => {
                        handleEdit(comment._id);
                      }}
                    >
                      <RiEdit2Fill />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right ">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="btn-hover text-destructive"
                      onClick={() => {
                        handleDelete(comment._id);
                      }}
                    >
                      <RiDeleteBin5Fill />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div>
          <h1>No comment data found!</h1>
        </div>
      )}
    </div>
  );
};

export default UserCommentsDetails;
