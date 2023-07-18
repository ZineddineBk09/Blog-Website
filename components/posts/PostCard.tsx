import Image from "next/image";
import Link from "next/link";
import { Article } from "@/interfaces";

const styles = {
  wrapper: `max-w-[46rem] w-full h-[10rem] flex items-center justify-between gap-[1rem] cursor-pointer`,
  postDetails: `flex-[2.5] flex flex-col`,
  authorContainer: `flex gap-[.4rem]`,
  authorName: `font-semibold`,
  authorImageContainer: `grid place-items-center rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]`,
  authorImage: `object-cover`,
  title: `font-bold text-2xl`,
  briefing: `text-[#787878]`,
  detailsContainer: `flex items-center justify-between text-[#787878]`,
  articleDetails: `my-2 text-[.8rem]`,
  bookmarkContainer: `cursor-pointer`,
  category: `bg-[#F2F3F2] p-1 rounded-full`,
  thumbnailContainer: `flex-1 `,
};

const PostCard = ({ post }: { post: Article }) => {
  console.log("Post: ", post);
  return (
    <Link href={`/blogs/${post.id}`}>
      <div className={styles.wrapper}>
        <div className={styles.postDetails}>
          <div className={styles.authorContainer}>
            <div className={styles.authorImageContainer}>
              <Image
                src={`/images/logo.png`}
                alt="Venlo Seeds"
                className={styles.authorImage}
                height={40}
                width={40}
              />
            </div>
            <div className={styles.authorName}>Venlo Seeds</div>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.briefing}>{post.brief}</div>
          <div className={styles.detailsContainer}>
            <span className={styles.articleDetails}>
              {new Date(post.published.seconds * 1000).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
              })}{" "}
              • {post.postLength} •{" "}
              <span className={styles.category}>{post.category}</span>
            </span>
          </div>
        </div>
        <div className={styles.thumbnailContainer}>
          <Image
            src={post?.banner || "default.png"}
            alt="thumbnail"
            height={100}
            width={100}
            className="rounded-md"
          />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
