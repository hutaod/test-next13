import { useScrollTop } from '@/components/hooks/use-scroll-top'
import { useMemo } from 'react';

function TestUseScrollTop() {
  const { scrollTop, end } = useScrollTop({ scrollFinshedThreshold: 300 });
  console.log(scrollTop, end)
  return (
    <div style={useMemo(() => ({ height: 10000 }), [])}>
      <div style={useMemo(() => ({ position: "fixed", top: 20, left: 20 }), [])}>
        <p>scrollTop: {scrollTop}</p>
        <p>scrollEnd: {end ? "end!" : "scrolling"}</p>
      </div>
    </div>
  )
}

export default TestUseScrollTop