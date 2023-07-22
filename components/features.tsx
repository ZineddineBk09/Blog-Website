"use client";

import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import { getFirstThreeBlogs } from "@/utils";
import { Article } from "@/interfaces";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";

export default function Features() {
  const tabs = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<Article[]>([] as Article[]);
  const [loading, setLoading] = useState<boolean>(false);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const docs = await getFirstThreeBlogs();
      setBlogs(docs);
      setLoading(false);
    };
    getBlogs();
  }, []);


  return (
    <section className="relative" id="explore">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-white pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-green-300 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explore our blogs</h1>
            <p className="text-xl text-gray-600">
              Dive into our captivating blogs, where you'll find a wealth of
              insights and inspiration to nurture your passion for plants and
              unleash your green thumb."
            </p>
          </div>

          {/* Section content */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-col items-center md:gap-6">
              {/* Content */}
              <div
                className="w-full md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
                data-aos="fade-right"
              >
                {/* Tabs buttons */}
                <div className="w-full flex flex-col items-center mb-8 md:mb-0">
                  {blogs.map((blog, index) => (
                    <div
                      key={index}
                      className="relative w-full flex flex-col items-center justify-between border rounded p-4 mb-6 shadow md:items-start md:flex-row"
                    >
                      <div className="w-11/12 h-full flex flex-col items-start justify-between md:w-1/2">
                        <div className="mx-auto md:pr-4 text-center md:text-left ">
                          <p className="text-3xl font-bold ">{blog.title}</p>
                          <div
                            className="text-xl text-gray-600 mt-4 text-center mb-6 md:text-left md:mb-0"
                            dangerouslySetInnerHTML={{
                              __html: blog?.body.substring(0, 150) || "",
                            }}
                          ></div>
                        </div>
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="absolute bottom-8 left-4 btn-sm text-gray-200 bg-green-500 hover:bg-gray-600 hidden md:block"
                        >
                          <span>See more</span>
                        </Link>
                      </div>
                      <div className="w-1/2">
                        <Image
                          src={
                            "https://firebasestorage.googleapis.com/v0/b/venlo-seeds.appspot.com/o/blogs%2F" +
                              blog.id +
                              "?alt=media&token=636b5a2e-38f8-45a3-a840-4441f83e1849" ||
                            ""
                          }
                          alt={blog?.title || ""}
                          width={500}
                          height={500}
                          className="object-cover w-full rounded"
                        />
                      </div>
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="btn-sm mt-5 text-gray-200 bg-green-500 hover:bg-gray-600 block md:hidden"
                      >
                        <span>See more</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
