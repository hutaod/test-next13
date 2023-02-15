import React from "react";

type Props = {
  times: number;
};

const Demo1 = ({ times }: Props) => {
  return (
    <div>
      <h2>getInitialProps Demo1</h2>
      <div>启动后访问次数：{times}</div>
    </div>
  );
};

let times = 0;

Demo1.getInitialProps = async function getStaticProps() {
  times += 1;
  return {
    times,
  };
};

export default Demo1;
