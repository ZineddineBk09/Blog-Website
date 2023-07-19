"use client";
import { userAuth } from "@/app/context/AuthContext";
import { FirebaseError } from "firebase/app";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

export default function ResetPassword() {
  const { changePassword } = userAuth();
  const [error, setError] = useState<any>(null);
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string()
        .required("You must enter your old password")
        .min(8, "Old password must be at least 8 characters long"),
      new_password: Yup.string()
        .required("Enter your new password")
        .min(8, "New password must be at least 8 characters long"),
    }),
    onSubmit: async (values) => {
      try {
        await changePassword(values.old_password, values.new_password);
      } catch (err: any) {
        if (err.code === "auth/wrong-password") {
          setError("Your old password is incorrect");
        } else {
          setError("An unknown error occurred");
        }
        console.error("Change password error: ", err);
      }
    },
  });
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-4">Let's get you back up on your feet</h1>
            <p className="text-xl text-gray-600">
              Enter your old password and your new password to reset your
              password.
            </p>
          </div>

          {error && (
            <p className="max-w-sm mx-auto p-2 bg-red-200 text-center text-red-500 mb-3 transition-all duration-300 rounded">
              {
                error /* If there is an error, display it. Otherwise, display nothing */
              }
            </p>
          )}

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    Old password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="old_password"
                    name="old_password"
                    type="text"
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.old_password && formik.errors.old_password
                        ? "border border-red-500"
                        : "")
                    }
                    placeholder="••••••••"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.old_password}
                  />
                  <p className="text-red-500 text-xs">
                    {formik.touched.old_password && formik.errors.old_password
                      ? formik.errors.old_password
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    New Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="new_password"
                    name="new_password"
                    type="password"
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.new_password && formik.errors.new_password
                        ? "border border-red-500"
                        : "")
                    }
                    placeholder="••••••••"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.new_password}
                  />
                  <p className="text-red-500 text-xs">
                    {formik.touched.new_password && formik.errors.new_password
                      ? formik.errors.new_password
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-green-600 hover:bg-green-700 w-full">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
