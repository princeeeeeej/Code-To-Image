import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-roboto-condensed",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeToImage",
  description: "Convert your code to beautiful images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.variable} ${geistMono.variable} antialiased bg-[#000000]`}
      >
        {children}
      </body>
    </html>
  );
}
