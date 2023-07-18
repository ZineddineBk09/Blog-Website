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
} from "firebase/auth";

interface User {
  id: string;
  email: string;
  name: string;
}

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);

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
          console.log(userDoc);
          setUser(userDoc);
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
          console.log(userDoc);
          setUser(userDoc);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, googleSignIn, logOut, credentialsSignIn, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const userAuth = () => useContext(AuthContext);