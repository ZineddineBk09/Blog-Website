"use client";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Tooltip } from "@mui/material";
import { firestore, storage } from "@/firebase/clientApp";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import TextEditor from "../blogs/Editor";
import { Article } from "@/interfaces";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  post: Article;
};

export default function UpdateModal({ post }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useRouter();
  // handle banner and body separately
  const [body, setBody] = React.useState("");
  const [banner, setBanner] = React.useState<File>();
  const [bannerUrl, setBannerUrl] = React.useState<string>(post.banner);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log("post: ", post);
  React.useEffect(() => {
    if (!post) return;
    formik.setFieldValue("title", post.title);
    formik.setFieldValue("brief", post.brief);
    formik.setFieldValue("category", post.category);
    formik.setFieldValue("postLength", post.postLength);
    setBannerUrl(post.banner);
    setBody(post.body);
    setBody(post.body);
  }, [post]);

  return (
    <div>
      <Tooltip title="تعديل">
        <button onClick={handleClickOpen}>
          <PencilSquareIcon
            className="w-8 h-8 rounded-full p-1 hover:bg-gray-200"
            title="Edit Blog"
          />
        </button>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            width: "1000px",
            maxWidth: "90vw",
          },
        }}
      >
        <DialogContent>
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
                    placeholder="Blog Title"
                    value={formik.values.title}
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.title && formik.errors.title
                        ? "border border-red-500"
                        : "")
                    }
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
                    placeholder="Enter a brief description of your blog"
                    value={formik.values.brief}
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.brief && formik.errors.brief
                        ? "border border-red-500"
                        : "")
                    }
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
                    placeholder="Farming, Growing, etc."
                    value={formik.values.category}
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.category && formik.errors.category
                        ? "border border-red-500"
                        : "")
                    }
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
                    placeholder="15 min read, 5 min read, etc."
                    value={formik.values.postLength}
                    className={
                      "form-input w-full text-gray-800" +
                      " " +
                      (formik.touched.postLength && formik.errors.postLength
                        ? "border border-red-500"
                        : "")
                    }
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
                  <TextEditor setBody={setBody} body={body} />
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
