import Image from "next/image";
import {
  ArchiveBoxIcon,
  ChartPieIcon,
  CircleStackIcon,
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const styles = {
  wrapper: `w-4/5 h-fit flex items-center justify-center flex-[3] mt-10`,
  content: `h-fit p-[2rem]`,
  referencesContainer: `flex justify-between items-center mt-[2.2rem] mb-[1.2rem]`,
  authorContainer: `flex gap-[1rem]`,
  authorProfileImageContainer: `h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`,
  image: `object-contain w-full `,
  column: `flex-1 flex flex-col justify-center`,
  postDetails: `flex gap-[.2rem] text-[#787878]`,
  listenButton: `flex items-center gap-[.2rem] text-[#1A8917]`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  blogPostContainer: `flex flex-col gap-[1rem]`,
  bannerContainer: `h-[30rem] w-full grid center overflow-hidden mb-[2rem]`,
  title: `font-bold text-3xl`,
  subtitle: `font-mediumSerifItalic text-[1rem] text-gray-500`,
  articleText: `font-mediumSerif text-[1.2rem] text-gray-600`,
};

const BlogPost = ({ post }: any) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <>
          <div className={styles.referencesContainer}>
            <div className={styles.authorContainer}>
              <div className={styles.authorProfileImageContainer}>
                <Image
                  className={styles.image}
                  src={`/images/logo.png`}
                  alt="author"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.column}>
                <div>Venlo Seeds</div>
                <div className={styles.postDetails}>
                  <span>
                    {new Date(post.published).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    • {post.postLength}
                  </span>
                  {/* <span className={styles.listenButton}>
                    <AiFillPlayCircle /> Listen
                  </span> */}
                </div>
              </div>
            </div>
            <div className={styles.socials}>
              <Link href="/blogs/new-blog">
                <PencilSquareIcon
                  className="w-8 h-8 text-green-500 rounded-full p-1 hover:bg-gray-200"
                  title="Edit Blog"
                />
              </Link>
              <div className={styles.space} />
              <TrashIcon
                className="w-8 h-8 text-red-500  rounded-full p-1 hover:bg-gray-200"
                title="Delete Blog"
              />
            </div>
          </div>
          <div className={styles.blogPostContainer}>
            <div className={styles.bannerContainer}>
              <Image
                className={styles.image}
                src={`/images/hero-image.jpg`}
                alt="banner"
                height={100}
                width={100}
              />
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <h4 className={styles.subtitle}>
              <div>
                Venlo Seeds,{" "}
                {new Date(post.published).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div>{post.brief}</div>
            </h4>
            <div className={styles.articleText}>{post.body}</div>
          </div>
        </>
      </div>
    </div>
  );
};

export default BlogPost;