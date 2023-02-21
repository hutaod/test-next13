import { useEffect } from 'react';
// import produce from "immer";

function produce<D extends object>(base: D, recipe: (draft: D) => void) {
  // 用于存储改变后的新数据
  let newData: any;

  // 给 base 对象添加代理
  const proxy = new Proxy(base, {
    set(obj, key: string, value: any) {
      // 检查 newData 是否存在，如果不存在，创建 newData
      if (!newData) {
        // 浅拷贝对象
        newData = { ...obj }
      }
      // 修改 newData，而不是 base，永远不要修改 base
      newData[key] = value
      return true
    }
})
  // 将 对象的代理 作为入参传入 recipe，让外界修改的是代理，而不是原本的对象数据
  recipe(proxy)
  // 为了避免意外的修改发生，返回一个被“冻结”的对象，保证数据的纯度
  // 如果 newData 不存在，表示没有执行写操作，返回 base 即可
  return Object.freeze(newData as D || base)
}

function TestImmer() {
  useEffect(() => {
    const state = { label: "HTML", info: { desc: "超文本标记语言" } };
    const state1 = produce(state, (draft) => {
        draft.label = "H5";
        draft.info.desc = "H5";
    })
    console.log(state === state1) // false
    console.log(state.info === state1.info) // true
  }, [])

  return null;
}

export default TestImmer