"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "@/components/ui/footer";
import Link from "next/link";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <main className="grow">{children}</main>

      <Footer />
      <p className="w-full text-center my-3 text-gray-600">
        Developed by{" "}
        <Link
          href="https://www.linkedin.com/in/zineddine-benkhaled-b9b1a8195/"
          target="_blank"
          className="text-green-600 transition-all duration-200 hover:underline"
        >
          Zineddine Benkhaled
        </Link>
      </p>
    </>
  );
}
