function immer(baseState, thunk) {
  // 用于缓存被修改的对象，key 为原对象，value 为修改后的对象
  const copies = new Map();
  // 用于存储被代理的对象，被代理的不一定被修改，被修改的一定被代理。
  const proxies = new Map();

  const handler = {
    get(target, prop) {
      // 增加一个 get 的劫持，返回一个 Proxy
      return createProxy(target[prop])
    },
    set(target, prop, value) {
      const copy = getOrCreateCopy(target);
      copy[prop] = value; // 给拷贝对象设置值
      // const current = target[prop];
      // // 值不等的时候才进行设置值
      // if (current !== value) {
      //   const copy = getOrCreateCopy(target);
      //   copy[prop] = value; // 给拷贝对象设置值
      // }
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

  // function log(cb) {
  //   return (...args) => {
  //     const result = cb(...args);
  //     console.log("args", args, "result", result);
  //     return result;
  //   }
  // }

  const createProxy = function createProxy(base) {
    // 对象和数组进行劫持
    if (isPlainObject(base) || Array.isArray(base)) {
      let proxy = proxies.get(base);
      // 避免重复设置 Proxy 代理
      if (!proxy) {
        proxy = new Proxy(base, handler);
        proxies.set(base, proxy);
      }
      return proxy;
    }
    return base
  }

  // checks if the given base object has modifications, either because it is modified, or
  // because one of it's children is
  function hasChanges(base) {
    const proxy = proxies.get(base)
    if (!proxy) return false // nobody did read this object
    if (copies.has(base)) return true // a copy was created, so there are changes
    // look deeper
    const keys = Object.keys(base)
    for (let i = 0; i < keys.length; i++) {
        const value = base[keys[i]]
        if ((Array.isArray(value) || isPlainObject(value)) && hasChanges(value)) return true
    }
    return false
  }

  function finalize(state) {
    if (isPlainObject(state) || Array.isArray(state)) {
      // 未改变直接返回
      if(!hasChanges(state)) {
        return state
      }
      // 改变的获取副本进行遍历检查
      const copy = getOrCreateCopy(state)
      Object.keys(copy).forEach(prop => {
        copy[prop] = finalize(state[prop])
      })
      return copy;
    }
    return state;
  }

  const proxy = createProxy(baseState);
  thunk(proxy);
  return finalize(baseState)
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

export default immer;