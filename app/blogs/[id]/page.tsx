export const metadata = {
  title: blogs[0].title + " | " + "Venlo Seeds",
  description: blogs[0].body,
};

import BlogPost from "@/components/blogs/BlogPost";
import { blogs } from "@/data";
import React from "react";

const BlogArticle = () => {
  return (
    <main>
      <BlogPost post={blogs[0]} />
    </main>
  );
};

export default BlogArticle;
