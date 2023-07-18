"use client";
import { userAuth } from "@/app/context/AuthContext";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";

const LoginForm = () => {
  const { credentialsSignIn } = userAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password is too short"),
    }),
    onSubmit: (values) => {
      console.log(values);
      credentialsSignIn(values);
    },
  });
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome back.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.email && formik.errors.email
                        ? "border border-red-500"
                        : "")
                    }
                    placeholder="Enter your email address"
                    required
                  />
                  <p className="text-red-500 text-xs">
                    {formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between relative">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.password && formik.errors.password
                        ? "border border-red-500"
                        : "")
                    }
                    placeholder="Enter your password"
                    required
                  />
                  <p className="text-red-500 text-xs">
                    {formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className="btn text-white bg-green-600 hover:bg-green-700 w-full"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>

            <div className="text-gray-600 text-center mt-6">
              Don't you have an account?{" "}
              <Link
                href="/signup"
                className="text-green-600 hover:underline transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
