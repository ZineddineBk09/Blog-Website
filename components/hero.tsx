"use client";
import VideoThumb from "@/public/images/hero-image.jpg";
import ModalVideo from "@/components/modal-video";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/hero-img-no-bg.png')`,
        // add a black overlay to the image
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="absolute inset-0 "></div>

      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
        {/* Hero side image */}

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-72 md:pb-20">
          {/* Section header */}
          <div className="text-left pb-12 md:pb-16">
            <h1
              className="text-white text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Welcome To <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                Venlo Seeds
              </span>
            </h1>
            <div className="max-w-3xl mr-auto">
              <p
                className="text-gray-300 mb-8 md:text-xl"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Embark on a captivating journey through the wonders of nature's
                green realm, exploring the secrets and beauty hidden within
                every seed.
              </p>
              <div
                className="max-w-xs mr-auto sm:max-w-none sm:flex sm:justify-start"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <Link
                    className="btn text-white bg-green-600 hover:bg-green-700 w-full mb-4 sm:w-auto sm:mb-0"
                    href="/blogs"
                  >
                    Read our blogs
                  </Link>
                </div>
                <div>
                  <button
                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                    // on click scroll to explore
                    onClick={() => {
                      document
                        .getElementById("explore")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
