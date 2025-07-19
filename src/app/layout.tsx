import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import Header from "./components/header";
import { AuthContextProvider } from "./contexts/auth-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Notepad App",
  description: "Your Favorite AI Notepad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthContextProvider>
          {/* <Header /> */}
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
