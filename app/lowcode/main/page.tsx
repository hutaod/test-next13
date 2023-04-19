
const jsonSchema = {
  component: "div",
  props: {},
  children: [],
  // 事件
  events: {
    "click": "actions#link",
  },
  // 行为
  actions: {},
  // 依赖？
  dependencies: [],
}

const Page = () => {
  return (
    <div>page</div>
  )
}

export default Page