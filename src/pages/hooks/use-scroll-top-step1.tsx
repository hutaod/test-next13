import { useScrollTop } from "@/components/hooks/use-scroll-top-step1";
import { useMemo } from "react";

function TestUseScrollTop() {
  const scrollTop = useScrollTop();
  console.log(scrollTop);
  return (
    <div style={useMemo(() => ({ height: 10000 }), [])}>
      <div
        style={useMemo(() => ({ position: "fixed", top: 20, left: 20 }), [])}
      >
        <p>scrollTop: {scrollTop}</p>
      </div>
    </div>
  );
}

export default TestUseScrollTop;
