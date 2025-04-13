import type { Metadata } from "next";
import "./globals.css";
import { anticSlab, fablabSans, neueSans, shootingStar } from "@/assets/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-b from-background to-white ${neueSans.variable} ${fablabSans.variable} ${shootingStar.variable} ${anticSlab.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
