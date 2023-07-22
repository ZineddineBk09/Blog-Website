"use client";

import { userAuth } from "@/app/context/AuthContext";
import BlogForm from "@/components/blogs/BlogForm";
import LoginForm from "@/components/login/LoginForm";
import { auth } from "@/firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewBlogPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return <LoginForm />;
  }
  return (
    <>
      <BlogForm />
    </>
  );
}
