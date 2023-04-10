import { NextResponse } from 'next/server';

export async function POST() {
  console.log(1111)
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // });
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: "async title" })
    }, 100)
  });

  return NextResponse.json({ data })
}