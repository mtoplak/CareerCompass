"use client";
import Script from "next/script";

declare global {
  interface Window {
    _browsee?: ((...args: any[]) => void) & { q?: any[] };
  }
}

export default function Head() {
  return (
    <>
      <Script id="browsee-init" strategy="afterInteractive">
        {`window._browsee = window._browsee || function () { (_browsee.q = _browsee.q || []).push(arguments) };`}
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
    </>
  );
}
