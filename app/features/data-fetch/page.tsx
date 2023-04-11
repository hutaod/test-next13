"use client";
// export const metadata = {
//   title: 'test metadata',
// };
import "../global.css";

import { cache } from "react";
// import LoadingTest from "./loading-test"

const getPageInfo = cache(async function getPageInfo() {
  const { data } = await fetch(`http://localhost:3000/features/metadata/api`, { method: "POST" }).then((res) =>
    res.json(),
  );
  return data;
})

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const data = await getPageInfo();
//   console.log("generateMetadata", data)
//   return {
//     title: data.title,
//   };
// }

async function TestDataFetch() {
  const data = await getPageInfo();
  console.log(11112, data)
  return (
    <div>
      <h3>Test Data Fetch</h3>
      <div>{data?.title}</div>
    </div>
  );
}

export default TestDataFetch;
