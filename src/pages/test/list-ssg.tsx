import styles from "./list.module.css";
import axios from "axios";

const apiBase = "https://cnodejs.org/api/v1";

async function fetcher(apiPath: string) {
  const res = await axios.get(`${apiBase}${apiPath}`);
  return res.data?.data || [];
}

function App({ data, errorMsg }: { data: any; errorMsg: string }) {
  return (
    <div className={styles.container}>
      <h2>测试Next SSG渲染</h2>
      {errorMsg}
      <ul>
        {data?.map((item: any) => (
          <li key={item.id}>
            <a
              href={`https://cnodejs.org/topic/${item.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  let data = [];
  let errorMsg = null;
  const timeStart = Date.now();
  try {
    data = await fetcher("/topics");
  } catch (err) {
    errorMsg = `接口请求异常:${JSON.stringify(err)}`;
  }
  return {
    props: {
      data,
      errorMsg,
      apiDurtion: Date.now() - timeStart,
    },
  };
}

export default App;
