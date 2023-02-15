import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Src Dir App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>页面列表</h2>
        <ul>
          <li>
            <Link href="/isr/demo1">ISR 定时更新</Link>
          </li>
          <li>
            <Link href="/isr/demo2">ISR 指令更新</Link>
          </li>
          <li>
            <Link href="/isr/demo2">ISR 动态路由</Link>
          </li>
          <li>
            <Link href="/ssp/demo1">SSP</Link>
          </li>
          <li>
            <Link href="/ip/demo1">getInitialProps</Link>
          </li>
          <li>
            <Link href="/hooks/use-scroll-top">test useScrollTop</Link>
          </li>
        </ul>
      </main>
    </>
  );
}
