/** @jsxRuntime classic */
/** @jsx HReact.createElement */
'use client';

import React, { useEffect } from 'react'
// import { render } from "react-dom";

import HReact from './hreact'

const ClientComp = () => {
  useEffect(() => {
    // const dom = document.getElementById('root')
    // const content = HReact.createElement('div', {
    //   props: {
    //     class: 'content'
    //   }
    // })
    // console.log(11111, render(content, dom))
    // dom.
    
  }, [])

  const element = (
    <div id="foo" className='1232'>
      <a>bar</a>
      <b />
      <button onClick={() => {
        console.log(1111)
      }}>测试事件</button>
    </div>
  )

  return (
    <div>
      实现一个简单版的功能完整的 React
      <div id='root'></div>
      {element}
      <Test />
    </div>
  )
}

function Test() {
  return <>test</>
}

export default ClientComp
