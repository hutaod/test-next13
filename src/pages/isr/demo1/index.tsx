import React from "react";

type Props = {
  times: number;
};

const Demo1 = ({ times }: Props) => {
  return (
    <div>
      <h2>ISR Demo1 - 定时刷新</h2>
      <div>刷新次数：{times}</div>
    </div>
  );
};

let times = 0;

export async function getStaticProps() {
  times += 1;
  console.log(`demo1:`, times);
  return {
    props: {
      mark: "demo1",
      times,
    },
    revalidate: 10, // In seconds
  };
}

export default Demo1;
