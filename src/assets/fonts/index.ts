import localFont from "next/font/local";

export const neueSans = localFont({
    src: [
      {
        path: "./neue-montreal-regular.otf",
        weight: "400",
        style: "normal",
      },
      {
        path: "./neue-montreal-medium.otf",
        weight: "500",
        style: "medium",
      },
      {
        path: "./neue-montreal-bold.otf",
        weight: "700",
        style: "bold",
      },
    ],
    variable: "--font-neue-sans",
  });
  
  export const fablabSans = localFont({
    src: [
      {
        path: "./fablab.ttf",
        weight: "400",
        style: "normal",
      },
    ],
    variable: "--font-fablab-sans",
  });
  
  export const shootingStar = localFont({
    src: "./shooting-star.otf",
    weight: "400",
    style: "normal",
    variable: "--font-shootingStar",
  });