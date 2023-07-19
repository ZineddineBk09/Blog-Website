import "./css/style.css";

import { Inter } from "next/font/google";

import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import { AuthProvider } from "./context/AuthContext";
import Footer from "@/components/ui/footer";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Venlo Seeds",
  description: "Venlo Seeds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>

          {/* <Banner /> */}
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
        </div>
      </body>
    </html>
  );
}
