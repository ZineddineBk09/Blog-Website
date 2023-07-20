import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchBlog } from "@/utils";
import { Article } from "@/interfaces";
import LoadingSpinner from "../LoadingSpinner";
import DeleteModal from "../modals/DeleteModal";
import UpdateModal from "../modals/UpdateModal";
import { userAuth } from "@/app/context/AuthContext";

const styles = {
  wrapper: `w-[80%] h-fit flex items-center justify-center flex-[3] lg:w-[65%]`,
  content: `h-fit p-2 lg:p-8`,
  referencesContainer: `flex justify-between items-center mb-[1.2rem]`,
  authorContainer: `flex gap-[1rem]`,
  authorProfileImageContainer: `h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`,
  image: `object-cover w-full `,
  column: `flex-1 flex flex-col justify-center`,
  postDetails: `flex gap-[.2rem] text-[#787878]`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  blogPostContainer: `flex flex-col gap-[1rem]`,
  bannerContainer: `h-[30rem] w-full grid center overflow-hidden mb-[2rem]`,
  title: `font-bold text-3xl`,
  subtitle: `font-mediumSerifItalic text-[1rem] text-gray-500`,
  articleText: `font-mediumSerif text-[1.2rem]`,
};

const BlogPost = ({ postId }: { postId: string }) => {
  const { user } = userAuth();
  // get blogs from firestore
  const [post, setPost] = useState<Article>();
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = async () => {
    setLoading(true);
    await fetchBlog(postId, setPost);
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <div className={`w-[80%] lg:w-[65%]`}>
      <div className={`h-fit p-2 lg:p-8`}>
        <>
          <div className={`flex justify-between items-center mb-[1.2rem]`}>
            <div className={`flex gap-[1rem]`}>
              <div
                className={`h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`}
              >
                <Image
                  className={`object-cover w-full `}
                  src={`/images/logo.png`}
                  alt="author"
                  width={100}
                  height={100}
                  quality={100}
                />
              </div>
              <div className={`flex-1 flex flex-col justify-center`}>
                <div>Venlo Seeds</div>
                <div className={`flex gap-[.2rem] text-[#787878]`}>
                  <span>
                    {new Date(
                      (post?.published.seconds || 0) * 1000
                    ).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    • {post?.postLength}
                  </span>
                </div>
              </div>
            </div>
            {user && (
              <div className={`flex gap-[1rem] text-[#787878] cursor-pointer`}>
                <UpdateModal post={post} refresh={refresh} />
                <div className={styles.space} />
                <DeleteModal id={postId} />
              </div>
            )}
          </div>
          <div className={`flex flex-col gap-[1rem]`}>
            <div
              className={`h-[30rem] w-full grid center overflow-hidden mb-[2rem]`}
            >
              <Image
                className={`object-cover w-full `}
                src={post?.banner || "/images/default.png"}
                alt="banner"
                height={100}
                width={100}
                quality={100}
              />
            </div>
            <h1 className={`font-bold text-3xl`}>{post?.title}</h1>
            <h4 className={`font-mediumSerifItalic text-[1rem] text-gray-500`}>
              <div>
                Venlo Seeds,{" "}
                {new Date((post?.published.seconds || 0) * 1000).toLocaleString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </div>
              <div>{post?.brief}</div>
            </h4>
            <div
              className={`text[1rem] lg:text-[1.2rem] w-full`}
              dangerouslySetInnerHTML={{ __html: post?.body || "" }}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default BlogPost;
