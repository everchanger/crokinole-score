import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crokinole scorekeeper",
  description: "A small app to keep score of Crokinole games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gradient-to-b from-zinc-50 to-zinc-200"}>{children}</body>
    </html>
  );
}
