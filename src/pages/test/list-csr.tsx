import styles from './list.module.css';
import axios from "axios";
import useSWR from "swr";

const apiBase = "https://cnodejs.org/api/v1"

async function fetcher(apiPath: string) {
  const res = await axios.get(`${apiBase}${apiPath}`)
  return res.data?.data || [];
}

function App() {
  const { data, isLoading } = useSWR("/topics", fetcher)
  return (
    <div className={styles.container}>
      <h2>测试Next CSR渲染</h2>
      {isLoading ? "loading" : (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>
              <a href={`https://cnodejs.org/topic/${item.id}`} target="_blank" rel="noreferrer" >{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
