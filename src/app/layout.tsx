import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Bluechip Gaming Platform",
  description: "Play exclusive casino games and win big prizes",
  keywords: "casino, games, online casino, slots, betting, gambling",
  themeColor: "#0A1428",
};

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-primary text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-6 lg:mt-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
