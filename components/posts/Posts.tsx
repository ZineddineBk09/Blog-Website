"use client"
import PostCard from "@/components/posts/PostCard";
import { blogs } from "@/data";
import { fetchBlogs } from "@/utils";
import React, { useEffect, useState } from "react";

const BlogPosts = () => {
  // get products from firestore
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const refresh = async () => {
      await fetchBlogs(setBlogs);
    };
    refresh();
  }, []);

  console.log("Blogs: ", blogs);
  return (
    <div className="w-10/12 flex flex-col items-start mx-auto pt-24">
      {blogs.map((blog) => (
        <PostCard post={blog} />
      ))}
    </div>
  );
};

export default BlogPosts;
