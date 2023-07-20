"use client";
import BlogPost from "@/components/blogs/BlogPost";
import BlogPosts from "@/components/posts/Posts";
import { usePathname } from "next/navigation";
import React from "react";

const BlogArticle = () => {
  const path = usePathname();
  const id = path.split("/")[2];

  return (
    <main className="w-full flex flex-col items-center justify-between mt-16 lg:flex-row lg:items-start">
      <BlogPost postId={id} />
      <div className="w-[80%] flex flex-col items-start lg:w-[30%]">
        <BlogPosts noSearch />
      </div>
    </main>
  );
};

export default BlogArticle;
