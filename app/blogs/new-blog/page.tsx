export const metadata = {
  title: "New Blog | Venlo Seeds",
  description: "Create a new blog post",
};

import BlogForm from "@/components/blogs/BlogForm";
import React from "react";

const NewBlogPage = () => {
  return (
    <>
      <BlogForm />
    </>
  );
};

export default NewBlogPage;
