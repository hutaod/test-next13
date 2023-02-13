import { GetStaticPropsContext } from 'next'
import React from 'react'

type Props = {
  id: string,
  name: string,
  content: string
}

const Demo3 = ({ name, content }: Props) => {
  return (
    <div>
      <h2>{name}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  // 获取详情
  const res = await fetch(`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://test-next13-alpha.vercel.app"}/api/posts/detail?id=${ctx.params?.id}`);
  const detail = await res.json()
  return {
    props: {
      ...detail
    }
  }
}

export async function getStaticPaths() {
  // // 从接口获取文章列表
  // const res = await fetch('http://localhost:3000/api/posts/list')
  // const posts = await res.json()

  // // 处理成 getStaticPaths 需要的返回参数
  // const paths = posts.map((post: any) => ({
  //   params: { id: post.id },
  // }))

  return { paths: [], fallback: 'blocking' }
}

export default Demo3