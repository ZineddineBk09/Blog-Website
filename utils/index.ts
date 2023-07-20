import { auth, firestore, googleProvider, storage } from "@/firebase/clientApp";
import { Article } from "@/interfaces";
import { signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
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

// add a new user email to newsletter collection
export const addEmailToNewsletter = async (
  email: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    // check if email already exists
    const q = query(
      collection(firestore, "newsletter"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setMessage("Email already exists");
      return;
    }

    const coll = collection(firestore, "newsletter");
    const docRef = await addDoc(coll, { email }).then((docRef) => {
      return docRef;
    });
    setMessage("Email added successfully");
    return docRef.id;
  } catch (error) {
    console.log("add document error: ", error);
    setMessage("Error adding email");
  }
};

export const getFirstThreeBlogs = async () => {
  try {
    const blogsRef = collection(firestore, "blogs");
    const blogsQuery = query(blogsRef, limit(3));
    const querySnapshot = await getDocs(blogsQuery);

    const blogs: Article[] = [];
    querySnapshot.forEach(async (doc) => {
      blogs.push({ ...(doc.data() as Article), id: doc.id });
    });

    return blogs;
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    return [];
  }
};
