"use client";
import { auth } from "@/firebase/clientApp";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
}

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const credentialsSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userDoc) => {
          setUser(userDoc);
          router.push("/blogs");
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userDoc) => {
          setUser(userDoc);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Re-authenticate the user with their old password
        const credentials = EmailAuthProvider.credential(
          currentUser?.email as string,
          oldPassword
        );
        await reauthenticateWithCredential(currentUser, credentials);

        // Update the user's password to the new one
        await updatePassword(currentUser, newPassword);

        // Log out the user and send them to the login page
        logOut();
        router.push("/signin");
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        credentialsSignIn,
        signUp,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const userAuth = () => useContext(AuthContext);
