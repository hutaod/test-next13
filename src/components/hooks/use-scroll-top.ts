import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

export function useScrollTop({
  minCriticalvalue = 0,
  maxCriticalvalue = 100000,
  scrollThreshold = 20,
  scrollFinshedThreshold = 500,
}: {
  /**
   * 监听滚动区域最小 scrollTop 值，单位px，默认 0，也就是scrollTop >=0 就触发重新渲染
   */
  minCriticalvalue?: number;
  /**
   * 监听滚动最大 scrollTop 值，单位px，默认 100000 ，也就是scrollTop <=100000 就触发重新渲染
   */
  maxCriticalvalue?: number;
  /**
   * 滚动防抖时间设置，默认 10ms
   */
  scrollThreshold?: number;
  /**
   * 滚动完成防抖时间设置，默认 500ms
   */
  scrollFinshedThreshold?: number;
  /**
   * 滚动
   */
  only?: number;
  // TODO: get container scrollTop
  // container?: HTMLElement;
} = {}) {
  const [scrollTop, setScrollTop] = useState(0);
  const [end, setEnd] = useState(true);
  useEffect(() => {
    let scrolling = false;
    let scrollTop = 0;
    const scrollEndTimer = 0;

    function handleChangeScrollTop(newScrollTop: number): void {
      setEnd(!scrolling)
      scrollTop = newScrollTop;
      setScrollTop(newScrollTop);
    }

    const scrollEnd = debounce(
      (newScrollTop) => {
        // 未结束才触发，不然又可能划出界限直接结束，导致上一次的 scrollEnd 还没结束。
        if (scrolling) {
          scrolling = false;
          handleChangeScrollTop(newScrollTop);
        }
      },
      scrollFinshedThreshold,
      { leading: false, trailing: true }
    );

    const handleScroll = scrollThreshold > 0 ? throttle((scrollTop: number) => {
      // 滚动中才触发，预防和结束时间冲突
      if (scrolling) {
        handleChangeScrollTop(scrollTop);
      }
    }, scrollThreshold, { leading: true, trailing: false }) : handleChangeScrollTop;

    function scrollFn(): void {
      // 设置为滚动中状态
      if (!scrolling) {
        scrolling = true;
      }

      const newScrollTop =
        document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      // 划出界限直接结束
      if (
        (newScrollTop <= minCriticalvalue && scrollTop >= minCriticalvalue) ||
        (newScrollTop >= maxCriticalvalue && scrollTop <= maxCriticalvalue)
      ) {
        scrolling = false;
        handleChangeScrollTop(newScrollTop);
        return;
      }
      
      // 未出界限则在触发滚动事件
      handleScroll(newScrollTop);

      // 调用已防抖的结束事件
      scrollEnd(newScrollTop);
    }
    window.addEventListener("scroll", scrollFn);
    return (): void => {
      window.removeEventListener("scroll", scrollFn);
      scrollEndTimer && clearTimeout(scrollEndTimer);
    };
  }, [minCriticalvalue, maxCriticalvalue, scrollThreshold, scrollFinshedThreshold]);
  return { scrollTop, end };
}
