// "use client";

// import { useState } from "react";

export default function FeaturesLayout({ children }: {
  children: React.ReactNode,
}) {
  // const [count, setCount] = useState(0);
  return (
    <div className="features">
      {/* <div onClick={() => setCount(count + 1)} >{count}</div> */}
      {children}
    </div>
  );
}