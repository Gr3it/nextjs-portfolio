import "./globals.css";
import { Poppins } from "next/font/google";

// Configurazione del font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Emanuele Zini",
  description: "My 3d portfolio experience",
};

export default function RootLayout({ children }) {
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
