import { useScrollTop } from '@/components/hooks/use-scroll-top'
import { useMemo } from 'react';

function TestUseScrollTop() {
  const { scrollTop, scrolling } = useScrollTop({ scrollFinshedThreshold: 300 });
  console.log(scrollTop, scrolling)
  return (
    <div style={useMemo(() => ({ height: 10000 }), [])}>
      <div style={useMemo(() => ({ position: "fixed", top: 20, left: 20 }), [])}>
        <p>scrollTop: {scrollTop}</p>
        <p>scrollEnd: {scrolling ? "scrolling" : "end"}</p>
      </div>
    </div>
  )
}

export default TestUseScrollTop