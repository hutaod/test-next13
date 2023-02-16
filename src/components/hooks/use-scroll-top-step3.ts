import { useEffect, useState } from "react";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

type Options = {
  /**
   * 滚动防抖时间设置，默认 10ms
   */
  scrollThreshold?: number;
  /**
   * 滚动完成防抖时间设置，默认 500ms
   */
  scrollFinshedThreshold?: number;
}

export function useScrollTop({ scrollThreshold = 10, scrollFinshedThreshold = 500 }: Options = {}) {
  const [state, setState] = useState({
    scrollTop: 0,
    scrolling: false,
  });
  useEffect(() => {
    // 滚动状态
    let scrolling = false;

    // 触发 setScrollTop 统一到此处
    function handleChangeScrollTop(newScrollTop: number): void {
      // 更新外部状态
      setState({
        scrollTop: newScrollTop,
        scrolling,
      })
      // 更新内部状态
    }

    // scrollThreshold 大于 0 才有使用 throttle 的必要
    const handleScroll = scrollThreshold > 0 ? throttle((newScrollTop: number) => {
      handleChangeScrollTop(newScrollTop);
    }, scrollThreshold, { leading: true, trailing: false }) : handleChangeScrollTop;

    // 滚动结束事件
    const scrollEnd = debounce(
      (newScrollTop) => {
        scrolling = false;
        handleChangeScrollTop(newScrollTop);
      },
      scrollFinshedThreshold,
      { leading: false, trailing: true }
    );

    function scrollFn(): void {
      scrolling = true;
      // 获取 scrollTop
      const newScrollTop =
        document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      // 更新 state
      handleScroll(newScrollTop);

      // 使用被 debounce 的函数来模拟滚动结束
      scrollEnd(newScrollTop)
    }
    // 监听 scroll 事件
    window.addEventListener("scroll", scrollFn);
    return (): void => {
      // 注销 scroll 事件
      window.removeEventListener("scroll", scrollFn);
    };
  }, []);
  return state;
}
