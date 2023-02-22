import { useEffect } from "react";
import produce from "../../common/immer/immer0004";

function TestImmer() {
  useEffect(() => {
    const state = {
      label: "HTML",
      info: {
        desc: "超文本标记语言",
        detail: {
          h1: { name: "标题标签" },
          div: { name: "块标签" },
        },
      },
      info2: { desc: "超文本标记语言" },
    };
    const state1 = produce(state, (draft: typeof state) => {
      draft.label = "HTML";
      draft.info.desc = "H5";
      draft.info.detail.h1.name = "H1";
    }) as typeof state;
    console.log(state === state1); // false
    console.log(state.info === state1.info); // false
    console.log(state.info.detail === state1.info.detail); // false
    console.log(state.info.detail.div === state1.info.detail.div); // true
    console.log(state.info2 === state1.info2); // true
  }, []);

  return null;
}

export default TestImmer;
