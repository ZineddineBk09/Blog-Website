import Image from "next/image";

export default function Newsletter() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* CTA box */}
          <div
            className="relative bg-green-500 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden"
            data-aos="zoom-y-out"
          >
            {/* Background illustration */}
            <div
              className="absolute right-0 bottom-0 pointer-events-none hidden lg:block"
              aria-hidden="true"
            >
              <Image
                className="hidden md:block h-96 object-cover rounded-lg"
                src="/images/hero.png"
                alt="Hero"
                quality={100}
                width={500}
                height={500}
              />
            </div>

            <div className="relative flex flex-col lg:flex-row justify-between items-center">
              {/* CTA content */}
              <div className="text-center lg:text-left lg:max-w-xl">
                <h3 className="h3 text-white mb-2">
                  Want to stay updated to the latest blogs?
                </h3>
                <p className="text-gray-200 text-lg mb-6">
                  Subscribe to our newsletter to get the latest news and updates
                  straight to your inbox.
                </p>

                {/* CTA form */}
                <form className="w-full lg:w-auto">
                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:mx-0">
                    <input
                      type="email"
                      className="form-input w-full appearance-none bg-gray-100 border border-gray-200 focus:border-gray-600 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-black placeholder-gray-500"
                      placeholder="Your email…"
                      aria-label="Your email…"
                    />
                    <a
                      className="btn text-white bg-black shadow hover:bg-opacity-90"
                      href="#0"
                    >
                      Subscribe
                    </a>
                  </div>
                  {/* Success message */}
                  {/* <p className="text-sm text-gray-400 mt-3">Thanks for subscribing!</p> */}
                  <p className="text-sm text-gray-100 mt-3">
                    No spam. You can unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
