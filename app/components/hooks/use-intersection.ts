import React, { useEffect, useState } from "react";

type Props = {
  el: React.RefObject<Element>;
  options?: IntersectionObserverInit;
};

export function useIntersection(props: Props): boolean {
  const { el, options } = props;
  // 是否到了指定位置区域
  const [intersection, setIntersection] = useState(true);

  useEffect(() => {
    if (!el.current) return;
    // 初始化 IntersectionObserver 实例
    const intersectionObserver = new IntersectionObserver(
      function (entries) {
        setIntersection(entries[0].intersectionRatio === 1);
      },
      { ...options, threshold: [1] }
    );

    // 开始监听
    intersectionObserver.observe(el.current);

    return (): void => {
      // 销毁
      intersectionObserver.disconnect();
    };
  }, [el.current]);

  return intersection;
}
