import * as React from "react";
import { MobileView, SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <React.Fragment>
      <SmoothScroll />
      <MobileView />
    </React.Fragment>
  );
}
