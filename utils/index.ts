import { auth, firestore, googleProvider, storage } from "@/firebase/clientApp";
import { signInWithPopup } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";

const handleUserAuth = async () => {
  const user = signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.error(error.message);
    });
};

export const fetchBlogs = async (
  setBlogs: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const blogs: any[] = [];

    await getDocs(collection(firestore, "blogs"))
      .then(async (querySnapshot: { docs: any }) => {
        for (const doc of querySnapshot.docs) {
          const blogData = doc.data();

          // Fetch blog image from storage
          const storageRef = ref(storage, `blogs/${doc.id}`);
          const imageUrl = await getDownloadURL(storageRef);

          // Create blog object with image URL
          const blog: any = {
            ...blogData,
            id: doc.id,
            banner: imageUrl,
            // Add other blog properties as needed
          };

          blogs.push(blog);
        }
        setBlogs(blogs);
      })
      .catch((error) => {
        console.log("Error fetching documents: ", error);
      });
  } catch (error) {
    console.log("Error fetching blogs: ", error);
  }
};

export const fetchBlog = async (
  id: string,
  setBlog: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    // Get the reference to the specific blog document
    const blogDocRef = doc(collection(firestore, "blogs"), id);
    // Get the blog document
    const blogDoc = await getDoc(blogDocRef);

    if (blogDoc.exists()) {
      const blogData = blogDoc.data();

      // Fetch blog image from storage
      const storageRef = ref(storage, `blogs/${id}`);
      const imageUrl = await getDownloadURL(storageRef);

      // Create blog object with image URL
      const blog = {
        ...blogData,
        id: blogDoc.id,
        banner: imageUrl,
        // Add other blog properties as needed
      };

      setBlog(blog);
    }
  } catch (error) {
    console.log("Error fetching blog: ", error);
  }
};

export const deleteBlogBanner = async (id: string) => {
  const storageRef = ref(storage, `blogs/${id}`);
  // Delete the image from Firebase Storage
  await deleteObject(storageRef);
};
