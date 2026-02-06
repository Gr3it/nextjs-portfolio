"use client";

import { useEffect } from "react";
import "./globals.css";
import { Poppins } from "next/font/google";
import Experience from "@/components/experience";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} h-screen w-full flex flex-col items-center antialiased`}
      >
        {children}
        <Experience />
      </body>
    </html>
  );
}
