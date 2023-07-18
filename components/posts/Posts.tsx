"use client";
import PostCard from "@/components/posts/PostCard";
import { blogs } from "@/data";
import { fetchBlogs } from "@/utils";
import React, { useEffect, useState } from "react";

const BlogPosts = () => {
  // get blogs from firestore
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const refresh = async () => {
      setLoading(true);
      await fetchBlogs(setBlogs);
      setLoading(false);
    };
    refresh();
  }, []);

  console.log("Blogs: ", blogs);
  return (
    <div className="w-10/12 flex flex-col items-start mx-auto pt-24">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-24 w-24 mb-6 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        blogs.map((blog) => <PostCard post={blog} />)
      )}
    </div>
  );
};

export default BlogPosts;
