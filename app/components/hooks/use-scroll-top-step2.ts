import { useEffect, useState } from "react";
import throttle from "lodash/throttle";

type Options = {
  /**
   * 滚动防抖时间设置，默认 10ms
   */
  scrollThreshold?: number;
};

export function useScrollTop({ scrollThreshold = 10 }: Options = {}) {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    // scrollThreshold 大于 0 才有使用 throttle 的必要
    const handleScroll =
      scrollThreshold > 0
        ? throttle(
            (newScrollTop: number) => {
              setScrollTop(newScrollTop);
            },
            scrollThreshold,
            { leading: true, trailing: false }
          )
        : setScrollTop;

    function scrollFn(): void {
      // 获取 scrollTop
      const newScrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      // 更新 state
      handleScroll(newScrollTop);
    }
    // 监听 scroll 事件
    window.addEventListener("scroll", scrollFn);
    return (): void => {
      // 注销 scroll 事件
      window.removeEventListener("scroll", scrollFn);
    };
  }, []);
  return scrollTop;
}
