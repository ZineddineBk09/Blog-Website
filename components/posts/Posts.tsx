"use client";
import PostCard from "@/components/posts/PostCard";
import { fetchBlogs } from "@/utils";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

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
    <div className="w-11/12 flex flex-col items-start mx-auto pt-24">
      {loading ? (
        <LoadingSpinner />
      ) : (
        blogs.map((blog) => <PostCard post={blog} key={blog.id} />)
      )}
    </div>
  );
};

export default BlogPosts;
