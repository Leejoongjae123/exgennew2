import { GeistSans } from "geist/font/sans";
import Header from "./components/Header";
import "./globals.css";
import Script from "next/script";
import RightSideBar from "./components/RightSideBar";
import { NextUIProvider } from "@nextui-org/react";
import { headers } from "next/headers";
import Footer from "./components/Footer";
import ChannelTalk from "./components/ChannelTalk";
export const metadata = {
  title: "체험단시대_육아맘놀이터 / 체플리케이션",
  description: "체험단시대 2.0 open ",
  icons: {
    icon: "https://rxgvhikbaexklehfaurw.supabase.co/storage/v1/object/public/images/images/ogimage.png",
  },
  openGraph: {
    images: [
      {
        url: "https://rxgvhikbaexklehfaurw.supabase.co/storage/v1/object/public/images/images/ogimage.png",
        width: 800,
        height: 600,
        alt: "OG Image",
      },
    ],
  },
  verification: {
    other:{
      'naver-site-verification':'214348c86c145d0f743c8451457cef3f1d1d3191'
    }
  },
  robots: {
    index: true,
    follow: true}
};

export default function RootLayout({ children }) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  if (pathname === "/login") {
    return <>{children}</>;
  }
  return (
    <html lang="en" >
      <body className="w-full h-full">
        <div id="wrapper" className="h-full">
          <Header></Header>
          <main
            id="site__main"
            class="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-full mt-[--m-top] "
          >
            <NextUIProvider>
              <div class="grid grid-cols-12 md:gap-x-10 " id="js-oversized">
                <div class="col-span-12 md:col-span-9 ">{children}</div>
                <div class="hidden md:block md:col-span-3 mt-10 ">
                  <RightSideBar></RightSideBar>
                </div>
              </div>
              <Footer></Footer>
            </NextUIProvider>
          </main>
        </div>
        <ChannelTalk>

        </ChannelTalk>

      </body>
    </html>
  );
}
