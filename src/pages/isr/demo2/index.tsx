import React from 'react'

type Props = {
  times: number
}

const Demo2 = ({ times }: Props) => {
  return (
    <div>
      <h2>定时刷新</h2>
      <div>刷新次数：{times}</div>
    </div>
  )
}

let times = 0;

export async function getStaticProps() {
  times += 1
  console.log(times)
  return {
    props: {
      times,
    }
  }
}

export default Demo2