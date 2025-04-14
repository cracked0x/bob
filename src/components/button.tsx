"use client";

import Link from "next/link";
import { forwardRef, ReactNode } from "react";

interface YellowButtonProps {
  children?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, YellowButtonProps>(
  ({ children, href, onClick, className = "", target = "_blank" }, ref) => {
    const buttonClasses = `relative z-10 bg-accent h-12 rounded-md px-6 flex items-center text-accent-foreground text-center border border-black shadow-md transition-all duration-200 -translate-y-1.5 hover:bg-[#ffd446] active:translate-y-0`;
    const shadowClasses = "absolute bottom-0 left-0 right-0 h-8 rounded-md z-0 striped-shadow";
    const cautionShadowStyle = {
      backgroundImage: "repeating-linear-gradient(120deg, #333, #333 10px, #4d5d53 10px, #4d5d53 20px)",
    };

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          className="block w-fit cursor-pointer"
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          <div className={`relative ${className} font-anticSlab text-base`}>
            <div className={buttonClasses}>{children}</div>
            <div
              className={shadowClasses}
              style={cautionShadowStyle}
            />
          </div>
        </Link>
      );
    }

    return (
      <button
        onClick={onClick}
        className="block w-fit cursor-pointer border-0 bg-transparent p-0"
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
      >
        <div className={`relative ${className} font-anticSlab text-base`}>
          <div className={buttonClasses}>{children}</div>
          <div
            className={shadowClasses}
            style={cautionShadowStyle}
          />
        </div>
      </button>
    );
  },
);

export default Button;
