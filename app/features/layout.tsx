"use client";

import { log } from './data-fetch/utils';

// import { useState } from "react";

export default function FeaturesLayout({ children }: {
  children: React.ReactNode,
}) {
  log("FeaturesLayout")
  // const [count, setCount] = useState(0);
  return (
    <div className="features">
      {/* <div onClick={() => setCount(count + 1)} >{count}</div> */}
      {children}
    </div>
  );
}