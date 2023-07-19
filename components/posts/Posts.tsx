"use client";
import PostCard from "@/components/posts/PostCard";
import { fetchBlogs } from "@/utils";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const BlogPosts = ({
  nbBlogs = 0,
  noSearch = false,
}: {
  nbBlogs?: number;
  noSearch?: boolean;
}) => {
  // get blogs from firestore
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const refresh = async () => {
      setLoading(true);
      await fetchBlogs(setBlogs);
      setLoading(false);
    };
    refresh();
  }, []);

  return (
    <div className="w-11/12 flex flex-col-reverse items-center justify-between mx-auto pt-24 lg:flex-row lg:items-start">
      <div className="w-full">
        {loading ? (
          <LoadingSpinner />
        ) : (
          blogs
            .slice(0, nbBlogs === 0 ? blogs.length : nbBlogs)
            .map((blog) => <PostCard post={blog} key={blog.id} />)
        )}
      </div>

      {!noSearch && <AutoComplete blogs={blogs} />}
    </div>
  );
};

const AutoComplete = ({ blogs }: { blogs: any[] }) => {
  const [selected, setSelected] = useState(blogs[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? blogs
      : blogs.filter((blog) =>
          blog.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full max-w-2xl mb-6 px-10 lg:w-1/2 lg:mb-0">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              id="search"
              name="search"
              type="search"
              className={"form-input w-full text-gray-800 rounded-r-none"}
              placeholder="Search for a blog post"
              required
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="w-10 flex items-center justify-center absolute inset-y-0 right-0 p-2 bg-green-600">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((blog) => (
                  <Combobox.Option
                    key={blog.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-gray-700" : "text-gray-900"
                      }`
                    }
                    value={blog}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {blog.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default BlogPosts;
