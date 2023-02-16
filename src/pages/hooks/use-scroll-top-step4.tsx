import { useScrollTop } from '@/components/hooks/use-scroll-top-step4'
import { useMemo } from 'react';

function TestUseScrollTop() {
  const { scrollTop, scrolling } = useScrollTop({
    scrollThreshold: 0,
    scrollFinshedThreshold: 0,
    minCriticalvalue: 500,
    maxCriticalvalue: 501
  });
  console.log(`scrollTop:${scrollTop}, scrolling:${scrolling}`)
  return (
    <div style={useMemo(() => ({ height: 10000 }), [])}>
      <div style={useMemo(() => ({ position: "fixed", top: 20, left: 20 }), [])}>
        <p>scrollTop: {scrollTop}</p>
        <p>scrolling: {scrolling ? "scrolling" : "end"}</p>
      </div>
    </div>
  )
}

export default TestUseScrollTop;
