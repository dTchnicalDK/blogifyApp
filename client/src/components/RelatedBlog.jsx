import React from "react";
import blogImg from "@/assets/logo2.jpg";
import { Link } from "react-router";
import { Card } from "./ui/card";

const RelatedBlog = () => {
  return (
    <div className="border-2 border-slate-50 p-2 bg-white rounded-lg">
      <Link>
        <div className="h-full w-full flex justify-between items-center gap-2 relative">
          <img src={blogImg} alt="Blog image" width={"80px"} />
          <div>
            <h1 className="line-clamp-2">
              This is the blog tilte here you can learn a lot.
            </h1>
          </div>
          <p className="absolute right-2 bottom-0 text-slate-300">createAt</p>
        </div>
      </Link>
    </div>
  );
};

export default RelatedBlog;
