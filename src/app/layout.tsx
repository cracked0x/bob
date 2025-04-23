import type { Metadata } from "next";
import "./globals.css";
import { anticSlab, fablabSans, neueSans, shootingStar } from "@/assets/fonts";

export const metadata: Metadata = {
  title: "Bob",
  description:
    "A Telegram bot for simplifying web3 interactions by removing technical barriers while preserving security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${neueSans.variable} ${fablabSans.variable} ${shootingStar.variable} ${anticSlab.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
