
const jsonSchema = {
  component: "div",
  props: {},
  children: [],
  // 事件绑定行为
  // 事件
  events: {
    // page 事件，进入enter/离开leave
    // 每个组件的事件
    // "mount"
    // "didmount"
    // "focus"
    // "close"
    // ""
    "click": {
      // 其他事件属性
      // 防抖设置
      debounce: 500,
      // 行为
      actions: [
        {
          actionType: "link", // 跳转
          target: "", // 打开新窗口/当前页面跳转
        },
        {
          actionType: "back", // 返回
        },
        {
          actionType: "refresh", // 刷新页面
        },
        {
          actionType: "share", // 分享
        },
        {
          actionType: "openModal",  // 打开弹窗
        },
        {
          actionType: "closeModal", // 关闭弹窗
        },
        {
          actionType: "request", // 请求接口，请求接口后可以操作上面所有行为
        },
      ],
    },
  },
  // con
  // // 行为
  // actions: {
  //   "linkTo": {
  //     eventType: "click",
  //   },
  // },
}

const Page = () => {
  return (
    <div>page</div>
  )
}

export default Page