import Head from "next/head";
import styles from "./list.module.css";

function TestHead() {
  return (
    <div className={styles.container}>
      <Head>
        {/* 官方只对 title/meta/base 做了处理，其他的使用可能会出现一些问题  */}
        <title>Next App Dir App 2</title>
        <meta name="description" content="1111" />
        {/* script/style/link标签都不建议使用 `next/head` 添加，本地开发会出现多次加载，容易出现一些问题，需要的情况请放在 docuemnt 中 */}
        {/* <script src="//cdn.jsdelivr.net/npm/eruda"></script>
        <style dangerouslySetInnerHTML={{ __html: `* { color: red !important }` }}></style>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossOrigin="anonymous" /> */}
      </Head>
      <h2>测试Head标签</h2>
    </div>
  );
}

export default TestHead;
