"use client";
import BlogPost from "@/components/blogs/BlogPost";
import { usePathname } from "next/navigation";
import React from "react";

const BlogArticle = () => {
  const path = usePathname();
  const id = path.split("/")[2];

  return (
    <main>
      <BlogPost postId={id} />
    </main>
  );
};

export default BlogArticle;
