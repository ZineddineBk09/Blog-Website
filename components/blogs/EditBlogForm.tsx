"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextEditor from "./Editor";
import { ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "@/firebase/clientApp";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

const EditBlogForm = () => {
  const navigate = useRouter();
  // handle banner and body separately
  const [body, setBody] = useState("");
  const [banner, setBanner] = React.useState<File>();
  const [bannerUrl, setBannerUrl] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const handleUploadImage = async (id: string) => {
    if (!banner) return;
    // upload banner to firebase storage
    const storageRef = ref(storage, `blogs/${id}`);
    await uploadBytes(storageRef, banner);
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setBannerUrl(URL.createObjectURL(e.target.files[0]));
    setBanner(e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      brief: "",
      category: "",
      postLength: "",
    },
    validationSchema: Yup.object({
      brief: Yup.string().required("You must enter a brief description"),
      category: Yup.string().required("You must enter a category"),
      postLength: Yup.string().required("You must enter a post length"),
      title: Yup.string().required("You must enter a title"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      // update the product doc on firestore
      await addDoc(collection(firestore, "blogs"), {
        ...values,
        body,
        published: new Date(),
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          handleUploadImage(docRef.id);
          setLoading(false);
          navigate.push("/blogs");
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error adding blog: ", error);
        });
    },
  });

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="w-11/12 mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Write a new blog post.</h1>
          </div>

          {/* Form */}
          <div className="mx-auto">
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-1 gap-2 md:grid-cols-2"
            >
              {/* Banner */}
              <div className="flex flex-wrap -mx-3 mb-4 col-span-2 relative">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    Banner <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="banner"
                    name="banner"
                    type="file"
                    className="form-input w-full text-gray-800 mb-3"
                    placeholder="Upload a banner image"
                    onChange={handleChangeImage}
                  />
                  {bannerUrl && (
                    <Image
                      src={bannerUrl}
                      width={3008}
                      height={1579}
                      alt="banner"
                      className="form-input object-cover w-full h-96 rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.title && formik.errors.title
                        ? "border border-red-500"
                        : "")
                    }
                    placeholder="Blog Title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-red-500 text-xs">
                    {formik.touched.title && formik.errors.title
                      ? formik.errors.title
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    Brief <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="brief"
                    name="brief"
                    type="text"
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.brief && formik.errors.brief
                        ? "border border-red-500"
                        : "")
                    }
                    placeholder="Enter a brief description of your blog"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-red-500 text-xs">
                    {formik.touched.brief && formik.errors.brief
                      ? formik.errors.brief
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.category && formik.errors.category
                        ? "border border-red-500"
                        : "")
                    }
                    placeholder="Farming, Growing, etc."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-red-500 text-xs">
                    {formik.touched.category && formik.errors.category
                      ? formik.errors.category
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    Post length <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="postLength"
                    name="postLength"
                    type="text"
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.postLength && formik.errors.postLength
                        ? "border border-red-500"
                        : "")
                    }
                    placeholder="15 min read, 5 min read, etc."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-red-500 text-xs">
                    {formik.touched.postLength && formik.errors.postLength
                      ? formik.errors.postLength
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4 col-span-2">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Body <span className="text-red-600">*</span>
                  </label>
                  <TextEditor setBody={setBody} />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6 col-span-2">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className={
                      "btn text-white bg-green-600 hover:bg-green-700 w-full"
                      
                    }
                  >
                    {loading ? "Publishing..." : "Publish"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditBlogForm;
