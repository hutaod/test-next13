import React from "react";

type Props = {
  times: number;
};

const Demo1 = ({ times }: Props) => {
  return (
    <div>
      <h2>SSG Demo1 - 纯静态，不能刷新</h2>
      <div>启动后访问次数：{times}</div>
    </div>
  );
};

let times = 0;

export async function getStaticProps() {
  times += 1;
  return {
    props: {
      times,
    },
  };
}

export default Demo1;
