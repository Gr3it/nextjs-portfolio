import { preload } from "react-dom";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Emanuele Zini",
  description: "My 3d portfolio experience",
};

export default function RootLayout({ children }) {
  preload("/video/car-animation.webm", {
    as: "video",
    type: "video/webm",
    fetchPriority: "high",
  });
  return (
    <html lang="en">
      <body
        className={`${poppins.className} h-screen w-full flex flex-col items-center antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
