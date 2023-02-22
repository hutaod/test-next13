function produce(baseState, recipe) {
  // 用于缓存被修改的对象，key 为原对象，value 为修改后的对象
  const copies = new Map();
  // 用于存储被代理的对象，被代理的不一定被修改，被修改的一定被代理。
  const proxies = new Map();

  const handler = {
    get(target, prop) {
      // 增加一个 get 的劫持，返回一个 Proxy
      return createProxy(target[prop]);
    },
    set(target, prop, value) {
      // 值没有变化，则不处理
      if (target[prop] === value) {
        return true;
      }
      // 值有变化，则进行拷贝再赋值
      const copy = getOrCreateCopy(target);
      copy[prop] = value; // 给拷贝对象设置值
      return true;
    },
  };

  // 获取 copy 元对象，没有则进行创建。
  function getOrCreateCopy(base) {
    let copy = copies.get(base);
    if (!copy) {
      // 浅拷贝
      copy = { ...base };
      copies.set(base, copy);
    }
    return copy;
  }

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
    return base;
  };

  // 检测对象是否修改了，需要检测子对象是否被修改
  function hasChanges(base) {
    const proxy = proxies.get(base);
    if (!proxy) return false; // 没有被代理，说明没有修改过子对象
    if (copies.has(base)) return true; // 一个对象被复制了，那一定被改变了
    // 递归检查
    const keys = Object.keys(base);
    for (let i = 0; i < keys.length; i++) {
      const value = base[keys[i]];
      if ((Array.isArray(value) || isPlainObject(value)) && hasChanges(value))
        return true;
    }
    return false;
  }

  function finalize(state) {
    if (isPlainObject(state) || Array.isArray(state)) {
      // 未改变直接返回
      if (!hasChanges(state)) {
        return state;
      }
      // 改变的获取副本进行递归检查
      const copy = getOrCreateCopy(state);
      Object.keys(copy).forEach((prop) => {
        copy[prop] = finalize(state[prop]);
      });
      return Object.freeze(copy);
    }
    return state;
  }

  const proxy = createProxy(baseState);
  // 把代理后的数据传递给外表
  recipe(proxy);
  return finalize(baseState);
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export default produce;
