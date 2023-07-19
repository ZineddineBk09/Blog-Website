"use client";
import { userAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = userAuth();
  const router = useRouter();
  if (!user) router.push("/signin");
  return (
    <>
      <main className="grow pt-16 md:pt-20">{children}</main>
    </>
  );
}
