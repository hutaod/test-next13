import { useEffect } from 'react';
import produce from "immer";

function TestImmer() {
  useEffect(() => {
    const state = [
        { label: "HTML", info: { desc: "超文本标记语言" } },
        { label: "CSS", info: { desc: "层叠样式表" } }
    ];

    const state1 = produce(state, draft => { 
        // 新增了一个对象
        draft.push({ label: "ES5", info: { desc: "基于原型和头等函数的多范式高级解释型编程语言" } });
        // 修改了了一个对象
        draft[1].label = "CSS3";
    })

    console.log(state === state1) // false
    console.log(state.length === state1.length) // false
    console.log(state[0] === state1[0]) // true
    console.log(state[1] === state1[1]) // false
    console.log(state[1].info === state1[1].info) // true
  }, [])

  return null;
}

export default TestImmer