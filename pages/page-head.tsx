import Head from "next/head";

const pageHead = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>页面标题</title>
        <meta name="description" content="next.js" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        {/* <base> 标签为页面上的所有的相对链接规定默认 URL 或默认目标。 https://www.runoob.com/tags/tag-base.html */}
        {/* <base href="http://xxxx/images/" target="_blank" /> */}
        {/* <style></style>
        <script></script> */}
        {/* <link rel="icon" href="favicon.ico" type="image/x-icon" /> */}
        {/* eslint-disable-next-line */}
        <script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js"></script>
        <link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet"></link>
      </Head>
      <meta name='hah' content='test' />
      <div>page-head</div>
    </>
  )
}

export default pageHead