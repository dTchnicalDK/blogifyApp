import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DOMPurify from "dompurify";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import defaultAvatar from "@/assets/profileImg.svg";
import defaultBlogImage from "@/assets/logo2.jpg";
import { FaRegComments } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { PiShareFatLight } from "react-icons/pi";
import CommentTransLitrate from "@/components/CommentTransLitrate";
import { Button } from "@/components/ui/button";
import CommentComp from "@/components/CommentComp";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchComments } from "@/components/utility/Utility.js";
import LikeCountCom from "@/components/LikeCountCom";
import { userContext } from "@/contexts/UserContexProvider";
import LikeButton from "@/components/LikeButton";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const SingleBlog = () => {
  const { id } = useParams();
  const [blogObj, setBlogObj] = useState();
  const [translate, setTranslate] = useState(true);
  const { loggedUser, login } = useContext(userContext);
  // console.log("logged user SingleBlog", loggedUser.data.user._id);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await axios.get(`${baseUrl}/api/blogs/getblog/${id}`);
        setBlogObj(blog.data.data);
      } catch (error) {
        console.log("single blog fetching error", error);
        toast.error(error.message || "error fetching single blog");
      }
    };
    fetchBlog();
  }, []);

  //safely parsing ckEditor content
  const sanitizedHtml = DOMPurify.sanitize(blogObj?.blogContent);

  return (
    <>
      {blogObj ? (
        <div className="container flex p-2">
          <div className="single-blog-detais w-full px-2">
            <Card>
              <CardHeader>
                {/* author like comment section  */}
                <div className=" w-full flex justify-between items-center">
                  <div>
                    <Link>
                      <div>
                        <span>
                          <img
                            src={blogObj.author.photoURL || defaultAvatar}
                            // {blogObj.author.photoURL}
                            height={"40px"}
                            width={"40px"}
                            alt="avatar"
                            className="rounded-full"
                          />
                        </span>
                        <span className="text-slate-400">
                          {blogObj.author.displayName}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <LikeCountCom
                      props={{
                        blogId: blogObj?._id,
                        userId: loggedUser?.data.user._id,
                      }}
                    />
                    <p className="text-slate-400">
                      {blogObj.category.categoryName}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardHeader className="text-2xl text-center font-bold">
                <h1>{blogObj?.blogTitle}</h1>
              </CardHeader>
              <CardContent>
                <div className="image-section flex justify-center ">
                  <img
                    src={blogObj?.featuredImage || defaultBlogImage}
                    alt="blog-image"
                    height={"300px"}
                    width={"300px"}
                  />
                </div>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>

                <div className="action w-full flex justify-around items-center py-2.5 m-2.5  text-slate-500 text-2xl ">
                  <LikeButton
                    props={{
                      blogId: blogObj?._id,
                      userId: loggedUser?.data.user._id,
                    }}
                  />

                  {/* ////////////comment dialog box/////////////////// */}
                  <Dialog>
                    <DialogTrigger>
                      <div className="px-8 rounded-2xl py-1.5 flex justify-center items-center hover:bg-slate-100 cursor-pointer">
                        <FaRegComments />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Comments</DialogTitle>
                      </DialogHeader>

                      <div className="comments h-[60vh] overflow-y-auto ">
                        <CommentComp props={blogObj} />
                      </div>
                      {/* ///////////////button section////////////////// */}
                      {/* <div className=" pt-2 my-5 py-3">
                        <div className="flex gap-5">
                          <Button
                            variant={translate ? "" : "secondary"}
                            onClick={() => setTranslate(true)}
                          >
                            {" "}
                            हिन्दी{" "}
                          </Button>
                          <Button
                            variant={translate ? "secondary" : ""}
                            onClick={() => setTranslate(false)}
                          >
                            {" "}
                            English{" "}
                          </Button>
                        </div>
                        {translate ? (
                          <CommentTransLitrate
                            props={{ blogId: blogObj._id }}
                          />
                        ) : (
                          <CommentComp props={{ blogObj }} />
                        )}
                      </div> */}
                    </DialogContent>
                  </Dialog>
                  <div className="px-8 rounded-2xl py-1.5 flex justify-center items-center hover:bg-slate-100 cursor-pointer">
                    <PiShareFatLight />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="recent-blog w-[25%] hidden md:block">
            {" "}
            <Card></Card>
          </div>
        </div>
      ) : (
        <div>No blogs to show</div>
      )}
    </>
  );
};

export default SingleBlog;
