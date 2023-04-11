"use client";

import { cache } from "react";

export const getPageInfo = cache(async function getPageInfo() {
  const { data } = await fetch(`http://localhost:3000/features/metadata/api`, { method: "POST" }).then((res) =>
    res.json(),
  );
  return data;
})

const LoadingTest = async () => {
  const data = await getPageInfo();
  return (
    <div>Loading Component Test : {data.title}</div>
  )
}

export default LoadingTest