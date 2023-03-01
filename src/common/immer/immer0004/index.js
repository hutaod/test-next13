function produce(baseState, recipe) {
  // 用于缓存被修改的对象，key 为原对象，value 为修改后的对象
  const copies = new Map();
  // 用于存储被代理的对象，key 为原对象，value 为代理对象
  const proxies = new Map();

  const handler = {
    get(target, prop) {
      // 增加一个 get 的劫持，返回一个 Proxy
      return createProxy(getCurrentSource(target)[prop]);
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
    has(target, prop) {
      return prop in getCurrentSource(target);
    },
    ownKeys(target) {
      return Reflect.ownKeys(getCurrentSource(target));
    },
    deleteProperty(target, property) {
      // 有拷贝的删除拷贝的属性，不能删除原对象
      const copy = getOrCreateCopy(target);
      delete copy[property];
      return true;
    },
  };

  // 返回当前资源对象，有 copy 返回 copy 没有则返回 base
  function getCurrentSource(base) {
    const copy = copies.get(base);
    return copy || base;
  }

  // 获取 copy 元对象，没有则进行创建
  function getOrCreateCopy(base) {
    let copy = copies.get(base);
    if (!copy) {
      // 浅拷贝
      copy = Array.isArray(base) ? [...base] : { ...base };
      // 备案
      copies.set(base, copy);
    }
    return copy;
  }
  // 创建 proxy
  function createProxy(base) {
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
  }

  // 检测对象是否修改了，需要检测子对象是否被修改
  function hasChanges(base) {
    const proxy = proxies.get(base);
    if (!proxy) return false; // 没有被代理，说明没有修改过子对象
    if (copies.has(base)) return true; // 一个对象被复制了，那一定被改变了
    // 递归检查子数据
    const keys = Object.keys(base);
    for (let i = 0; i < keys.length; i++) {
      const value = base[keys[i]];
      // 对象或者数组需要再次使用 `hasChanges` 递归检查。
      if ((Array.isArray(value) || isPlainObject(value)) && hasChanges(value)) {
        return true;
      }
    }
    // 其他数据类型都是原始类型，不要判断，直接返回 false。
    return false;
  }

  // 处理数据，返回被修改后的数据
  function finalize(state) {
    if (isPlainObject(state) || Array.isArray(state)) {
      // 未改变直接返回
      if (!hasChanges(state)) {
        return state;
      }
      // 改变的对象，则获取副本进行递归检查
      const copy = getOrCreateCopy(state);
      if (Array.isArray(copy)) {
        // 数组处理方式，检查子节点
        copy.forEach((value, index) => {
          copy[index] = finalize(copy[index]);
        });
      } else {
        // 普通对象处理方式，检查子属性值
        Object.keys(copy).forEach((prop) => {
          copy[prop] = finalize(copy[prop]);
        });
      }
      return Object.freeze(copy);
    }
    return state;
  }

  const proxy = createProxy(baseState);
  // 把代理后的数据传递给 recipe 函数，让用户修改被代理的对象
  recipe(proxy);
  // 返回被修改后的数据。
  return finalize(baseState);
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export default produce;
