import { useScrollTop } from "@/components/hooks/use-scroll-top";
import { useMemo } from "react";

const params = {
  minCriticalvalue: 200,
  maxCriticalvalue: 500,
};
function TestUseScrollTop() {
  const { scrollTop, scrolling } = useScrollTop({
    scrollFinshedThreshold: 300,
    minCriticalvalue: 200,
    maxCriticalvalue: 500,
  });
  console.log(scrollTop, scrolling);
  return (
    <div style={useMemo(() => ({ height: 10000 }), [])}>
      <div
        style={useMemo(() => ({ position: "fixed", top: 20, left: 20 }), [])}
      >
        <h3>区域内滚动事件触发</h3>
        <p>参数：{JSON.stringify(params, null, 4)}</p>
        <p>scrollTop: {scrollTop}</p>
        <p>scrollEnd: {scrolling ? "scrolling" : "end"}</p>
      </div>
    </div>
  );
}

export default TestUseScrollTop;
