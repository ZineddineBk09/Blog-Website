import "./css/style.css";

import { Inter } from "next/font/google";

import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import { AuthProvider } from "./context/AuthContext";
import Footer from "@/components/ui/footer";

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
        </div>
      </body>
    </html>
  );
}
