// 用于记录 workInProgress，构建中的 React 元素是唯一的
const ReactCurrentOwner = {
  current: null,
}

function createElement(type: string, config?: Record<string, any>, ...children: any[]) {
  console.log("--- createElement ---", type, config, children)
  const { key, ref, __self, __source, ...rest } = config || {};
  const props = {
    ...rest,
    children: children || []
  }
  return {
    // 让我们识别 React 元素的唯一标志
    $$typeof: Symbol.for('react.element'),

    // 元素的内置属性
    type: type,
    key: typeof key === "undefined" ? null : key,
    ref: typeof ref === "undefined" ? null : ref,
    props: props,

    // 记录负责创建此元素的组件，调用 cloneElement 时会进行设置，但cloneElement已被废弃
    _owner: ReactCurrentOwner.current,
  }
}

const HReact = {
  createElement
}

export default HReact