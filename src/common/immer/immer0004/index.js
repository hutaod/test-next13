function immer(baseState, thunk) {
  // 用于缓存被修改的对象，key 为原对象，value 为修改后的对象
  const copies = new Map();

  const handler = {
    get(target, prop) {
      // 增加一个 get 的劫持，返回一个 Proxy
      return createProxy(target[prop])
    },
    set(target, prop, value) {
      const current = target[prop];
      // 值不等的时候才进行设置值
      if (current !== value) {
        const copy = getOrCreateCopy(target);
        copy[prop] = value; // 给拷贝对象设置值
      }
      return true;
    }
  }

  function getOrCreateCopy(base) {
    let copy = copies.get(base);
    if (!copy) { // 浅拷贝
      copy = { ...base };
    }
    copies.set(base, copy);
    return copy;
  }

  function createProxy(base) {
    // 对象和数组进行劫持
    if (isPlainObject(base) || Array.isArray(base)) {
      const copy = copies.get(base);
      // 避免重复设置 Proxy 代理
      if (copy) {
        return copy;
      }
      return new Proxy(base, handler);
    }
    return base
  }

  function finalize(state) {
    const copy = copies.get(state);
    const result = copy || { ...state };
    Object.keys(state).forEach(prop => {
      // 属性对象有缓存则获取缓存
      const copy = copies.get(state[prop]);
      if (copy) { // 如果有 copy 表示被修改过
        result[prop] = copy // 就是用修改后的内容
      }
    })
    return result;
  }
  const proxy = new Proxy(baseState, handler);
  thunk(proxy);
  return finalize(baseState)
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

export default immer;