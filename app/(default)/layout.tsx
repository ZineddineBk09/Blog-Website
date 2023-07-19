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
      <main className="grow pt-16 md:pt-20">{children}</main>
    </>
  );
}
