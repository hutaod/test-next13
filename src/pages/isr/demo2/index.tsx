import React from "react";

type Props = {
  times: number;
};

const Demo2 = ({ times }: Props) => {
  return (
    <div>
      <h2>ISR Demo2 - 指令刷新</h2>
      <div>刷新次数：{times}</div>
    </div>
  );
};

let times = 0;

export async function getStaticProps() {
  times += 1;
  console.log(`demo2:`, times);
  return {
    props: {
      mark: "demo2",
      times,
    },
  };
}

export default Demo2;
