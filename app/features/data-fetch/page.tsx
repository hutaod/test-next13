// export const metadata = {
//   title: 'test metadata',
// };

import { cache } from "react";
// import ClientComp from "./ClientComp";
import { log } from './utils';

const getPageInfo = cache(async function getPageInfo() {
  const { data } = await fetch(`http://localhost:3001/features/metadata/api`, { method: "POST" }).then((res) =>
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

async function TestDataFetch() {
  const data = await getPageInfo();
  log("TestDataFetch", data)
  return (
    <div>
      <h3>Test Data Fetch</h3>
      <div>{data?.title}</div>
      {/* <ClientComp /> */}
    </div>
  );
}

export default TestDataFetch;
