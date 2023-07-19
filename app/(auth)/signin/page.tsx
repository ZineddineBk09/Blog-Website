"use client";
import { userAuth } from "@/app/context/AuthContext";
import LoginForm from "@/components/login/LoginForm";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignIn() {
  const { user } = userAuth();
  const router = useRouter();
  if (user) router.push("/");
  return <LoginForm />;
}
