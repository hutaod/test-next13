import { useScrollTop } from '@/components/hooks/use-scroll-top-step3'
import { useMemo } from 'react';

function TestUseScrollTop() {
  const { scrollTop, scrolling } = useScrollTop({ scrollThreshold: 50, scrollFinshedThreshold: 300 });
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
