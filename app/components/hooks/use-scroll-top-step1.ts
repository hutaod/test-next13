import { useEffect, useState } from "react";

export function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    function scrollFn(): void {
      // 获取 scrollTop
      const newScrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      // 更新 state
      setScrollTop(newScrollTop);
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
