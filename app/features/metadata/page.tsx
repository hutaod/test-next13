// export const metadata = {
//   title: 'test metadata',
// };
import Link from "next/link";
import "../global.css";

import { cache } from "react";
import { log } from '../data-fetch/utils';

const getPageInfo = cache(async function getPageInfo() {
  const { data } = await fetch(`http://localhost:3000/features/metadata/api`, { method: "POST" }).then((res) =>
    res.json(),
  );
  return data;
})

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPageInfo();
  log("generateMetadata", data)
  return {
    title: data.title,
  };
}

async function TestMetadata() {
  const data = await getPageInfo();
  log(data)
  return (
    <div>
      <h3>Test Metadata</h3>
      <div>{data?.title}</div>
      <Link href={"/features/data-fetch"}>data fetch page</Link>
    </div>
  );
}

export default TestMetadata;
