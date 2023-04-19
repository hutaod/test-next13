// export const metadata = {
//   title: 'test metadata',
// };
import Link from "next/link";
import Script from 'next/script'
import "../global.css";

import { cache } from "react";
import { log } from '../data-fetch/utils';

const getPageInfo = cache(async function getPageInfo() {
  try {
    const { data } = await fetch(`http://localhost:3000/features/metadata/api`, { method: "POST" }).then((res) =>
      res.json(),
    );
    console.log("success:", data)
    return data;
  } catch (error) {
    console.log("error:", error)
    return { title: "" }
  }
})


// export async function generateMetadata(props: any, ...rest: any) {
//   console.log(1111, props, rest)
//   const data = await getPageInfo();
//   log("generateMetadata", data)
//   return {
//     title: data.title,
//   };
// }

async function TestMetadata() {
  const data = await getPageInfo();
  log(data)
  return (
    <div>
      <title>{data?.title}</title>
      <h3>Test Metadata</h3>
      <meta name='description' content={data?.desc || "hello next.js"} />
      <link rel='stylesheet' href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css"></link>
      {/* <base target="_blank" /> */}
      <Script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js" />
      <div>{data?.title}</div>
      <Link href={"/features/data-fetch"}>data fetch page</Link>
    </div>
  );
}

export default TestMetadata;
