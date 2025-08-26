import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DOMPurify from "dompurify";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import defaultAvatar from "@/assets/profileImg.svg";
import defaultBlogImage from "@/assets/logo2.jpg";
import { FaRegComments } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { PiShareFatLight } from "react-icons/pi";
import CommentTransLitrate from "@/components/CommentTransLitrate";
import { Button } from "@/components/ui/button";
import { userContext } from "@/contexts/UserContexProvider";
import LikeButton from "@/components/LikeButton";
import { Spinner } from "react-bootstrap";
import RelatedBlog from "@/components/RelatedBlog";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/CommentSection";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const SingleBlog = () => {
  const { id } = useParams();
  const [blogObj, setBlogObj] = useState({
    author: { displayName: "inactive", email: "unknown", photoURL: "" },
  });
  const { loggedUser, isLoading: userLoading } = useContext(userContext);
  const [commentCount, setCommentCount] = useState(0);
  const [refetchCommentCount, setRefetchCommentCount] = useState(false);
  const [translate, setTranslate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const commentRef = useRef(null);

  // --------------fetching user on load--------------------------
  useEffect(() => {
    // Only fetch blog if user data is loaded (or determined to be null)
    if (!userLoading) {
      const fetchBlog = async () => {
        try {
          setIsLoading(true);
          const blog = await axios.get(`${baseUrl}/api/blogs/getblog/${id}`);
          // console.log("blog data res before set", blog.data.data);
          setBlogObj(blog.data.data);
        } catch (error) {
          console.error("Blog fetch error:", error);
          toast.error(error.message || "Error fetching blog");
        } finally {
          setIsLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id, userLoading]); // Add userLoading as dependency //userLoading

  // -------------------fetching comment count-----------------
  useEffect(() => {
    const count = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${baseUrl}/api/comments/comments-count/${blogObj._id}`,
          {
            withCredentials: true,
          }
        );

        setCommentCount(res.data.data);
      } catch (error) {
        console.log("comment count error", error);
        toast.error(
          error.response.message ||
            error.response.msg ||
            "comment count couldn't be fetched"
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (blogObj && blogObj._id) {
      count();
    }
  }, [blogObj, refetchCommentCount]);

  const handleCommentClick = () => {
    console.log("comment clicked");
    //scrolling to comment input box
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (!blogObj) {
    return <Spinner />;
  }

  return (
    <>
      {!blogObj ? (
        <div>No blogs to show</div>
      ) : (
        <div className="container flex flex-col md:flex-row  ">
          <div className="single-blog-detais w-full px-4 ">
            <Card>
              <CardHeader className="text-3xl text-center font-serif font-semibold text-teal-500">
                <h1>{blogObj?.blogTitle}</h1>
              </CardHeader>
              {/* -----------blog image and content section--------------------- */}
              <CardContent>
                <div className="image-section flex justify-center mb-5">
                  <img
                    src={blogObj?.featuredImage || defaultBlogImage}
                    alt="blog-image"
                    className="w-full mb5"
                  />
                </div>
                <div className="content mb-5">
                  <p>{blogObj.blogContent}</p>
                </div>
                {/* ------------------------------topbar section----------------------- */}
                {/* author like comment section  */}
                <Separator className={"mt-2"} />
                <div className=" w-full flex justify-between items-center mt-5">
                  <div>
                    <Link>
                      <div>
                        <span>
                          <img
                            src={blogObj?.author?.photoURL || defaultAvatar}
                            height={"40px"}
                            width={"40px"}
                            alt="avatar"
                            className="rounded-full "
                          />
                        </span>
                        <span className="text-slate-400 text-center">
                          {blogObj?.author?.displayName || "inactive user"}
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* -----------------buttons Section------------------------- */}
                  <div className="action w-full flex justify-around items-center py-2.5 m-2.5  text-slate-500  ">
                    {!loggedUser || !blogObj ? (
                      <h1>loading....</h1>
                    ) : (
                      <>
                        {!blogObj || !loggedUser ? (
                          <>Loading...</>
                        ) : (
                          <>
                            <LikeButton
                              props={{
                                blogId: blogObj?._id,
                                userId: loggedUser._id,
                              }}
                            />
                          </>
                        )}
                      </>
                    )}

                    <div
                      onClick={handleCommentClick}
                      className="comment-count px-8 rounded-2xl py-1.5 flex justify-center items-center hover:bg-slate-100 cursor-pointer gap-2"
                    >
                      <FaRegComments className="text-2xl text-gray-700" />
                      <span>{commentCount}</span>
                    </div>

                    {/* ///////////////translate section////////////////// */}
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

                    <div className="px-8 rounded-2xl py-1.5 flex justify-center items-center hover:bg-slate-100 cursor-pointer">
                      <PiShareFatLight className="text-2xl text-gray-700" />
                    </div>
                    <div className="text-center">
                      <p>Category</p>
                      <p className="text-slate-400">
                        {blogObj?.category?.categoryName}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --------------------comment section----------------------- */}
            <CommentSection
              props={blogObj}
              setRefetchCommentCount={setRefetchCommentCount}
            />
            <div className="comment-ref" ref={commentRef}></div>
          </div>

          <div className="md:w-2/6">
            <h1 className="font-bold">Related Blogs</h1>

            <RelatedBlog
              props={{ currentBlog: blogObj._id, category: blogObj.category }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
