"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import { userAuth } from "@/app/context/AuthContext";
import Loading from "./Loading";

export default function Header() {
  const { user, logOut } = userAuth();
  const [loading, setLoading] = useState<boolean>(true);

  // get the page we're currently on so we can highlight the right menu item
  const path = usePathname().replace("/", "");
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          {loading ? (
            <Loading />
          ) : path != "signin" && path != "signup" ? (
            <nav className="hidden md:flex md:grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                {user && (
                  <li>
                    <Link
                      href="/new-blog"
                      className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                    >
                      Write
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href={path == "blogs" ? "/" : "/blogs"}
                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    {path == "blogs" ? "Home" : "Blogs"}
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link
                      href="/change-password"
                      className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                    >
                      Change Password
                    </Link>
                  </li>
                )}
                {user && (
                  <button
                    onClick={handleSignOut}
                    className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                  >
                    <span>Sign Out</span>
                    <svg
                      className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </button>
                )}
                {/* <li>
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                    >
                      <span>Sign Out</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href="/signin"
                      className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                    >
                      <span>Sign In</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </Link>
                  )}
                </li> */}
              </ul>
            </nav>
          ) : (
            ""
          )}

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
