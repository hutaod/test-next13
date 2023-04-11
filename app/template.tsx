// "use client";

// import { useState } from "react";

export default function RootLayout({ children }: {
  children: React.ReactNode,
}) {
  // const [count, setCount] = useState(0);
  return (
    <div className="root-template">
      {/* <div onClick={() => setCount(count + 1)} >Root Template count: {count}</div> */}
      {children}
    </div>
  );
}