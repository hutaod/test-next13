import React, { useRef, useEffect } from "react";
import { useIntersection } from "../../components/hooks/use-intersection";

export type AutoFixedProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  /** 是否一直吸顶或者吸底 */
  alwaysFixed?: boolean;
  /** 吸顶距离 */
  top?: string;
  /** 吸底距离 */
  bottom?: string;
  /** 元素框高度 */
  height: number | string;
  /** 相对的目标元素，因为是用的 fixed 定位，记得做相应处理。 */
  root?: Element | Document | null;
  zIndex?: number;
  children: React.ReactNode;
  /** 固定的时候才有的className */
  fixedClassName?: string;
  /** 固定的时候才有的样式 */
  fixedStyle?: React.CSSProperties;
  /** fixed状态改变时调用 */
  onFixedChange?: (isFixed: boolean) => void;
};

export const AutoFixed = (props: AutoFixedProps) => {
  const {
    alwaysFixed,
    top,
    bottom,
    style,
    height,
    root,
    zIndex = 100,
    children,
    className,
    fixedClassName,
    fixedStyle,
    onFixedChange,
    ...rest
  } = props;
  // `bottom` 值存在时，表面要悬浮底部
  const isFiexdTop = !bottom;
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 设置监听参数控制：top 为吸顶距离，bottom 为吸底距离
  const options = {
    // rootMargin: `-${top || "0px"} 0px -${bottom || "0px"} 0px`,
    rootMargin: isFiexdTop
      ? `-${top || "0px"} 0px 1000000px 0px`
      : `0px 0px -${bottom || "0px"} 0px`,
    // 设置root
    root,
  } as IntersectionObserverInit;
  // 是否悬浮
  const intersection = useIntersection({ el: wrapperRef, options });
  const shouldFixed = alwaysFixed ? true : !intersection;

  useEffect(() => {
    // 通知外部
    onFixedChange?.(shouldFixed);
  }, [shouldFixed, onFixedChange]);

  return (
    <div
      style={{ ...style, height }}
      {...rest}
      className={`${className}${shouldFixed ? " fixedClassName" : ""}`}
      ref={wrapperRef}
    >
      <div
        style={{
          height,
          position: shouldFixed ? "fixed" : "initial",
          top: isFiexdTop ? top || 0 : undefined,
          bottom: isFiexdTop ? undefined : bottom || 0,
          zIndex: zIndex,
          ...(shouldFixed ? fixedStyle : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
};
