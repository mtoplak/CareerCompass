"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Script from "next/script";
import ScrollToTop from "@/components/ScrollToTop";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import ToasterContext from "./api/contex/ToasetContex";
import { useEffect, useState } from "react";
import PreLoader from "@/components/Common/PreLoader";

declare global {
  interface Window {
    _browsee?: ((...args: any[]) => void) & { q?: any[] };
  }
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head>
        <Script src="https://t.contentsquare.net/uxa/e6b30ae856427.js" strategy="afterInteractive" />
        <Script id="browsee-init" strategy="afterInteractive">
          {`
            window._browsee = window._browsee || function () { 
              (_browsee.q = _browsee.q || []).push(arguments) 
            };
          `}
        </Script>
        <Script 
          src="https://cdn.browsee.io/js/browsee.min.js" 
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== 'undefined' && window._browsee) {
              window._browsee('init', '85fdc0524cdc9688b4d546170614f5c754a0243469c6e732');
            }
          }}
        />
      </head>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <ToasterContext />
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </ThemeProvider>
          </SessionProvider>
        )}
      </body>
    </html>
  );
}
