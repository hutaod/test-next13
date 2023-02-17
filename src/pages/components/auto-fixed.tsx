import React from "react";
import { AutoFixed } from "../../components/ui/auto-fixed";

const AutoFixedDemo = () => {
  return (
    <div>
      <AutoFixed top="0px" height="20px">
        <div style={{ backgroundColor: "#bababa" }}>
          我是悬浮内容，距离顶部 0px ，一直吸顶
        </div>
      </AutoFixed>
      <div style={{ height: "300px" }}>我是占位 1，高度300px</div>
      <AutoFixed
        top="20px"
        height="20px"
        // fixed状态改变时
        onFixedChange={(isFixed): void => {
          console.log(`isFixed: ` + isFixed);
        }}
        // fixed状态需要添加的className
        fixedClassName="hello"
        // fixed状态需要添加的style
        fixedStyle={{ color: "red" }}
      >
        <div style={{ backgroundColor: "#bababa" }}>
          我是悬浮内容，距离顶部为 20px 吸顶
        </div>
      </AutoFixed>
      <div style={{ height: "1000px" }}>我是占位 2，高度500px</div>
      <AutoFixed
        bottom="20px"
        height="20px"
        // fixed状态改变时
        onFixedChange={(isFixed): void => {
          console.log(`isFixed: ` + isFixed);
        }}
        // fixed状态需要添加的className
        fixedClassName="hello"
        // fixed状态需要添加的style
        fixedStyle={{ color: "red" }}
      >
        <div style={{ backgroundColor: "#bababa" }}>
          我是悬浮内容，距离底部 20px吸底
        </div>
      </AutoFixed>
      <div style={{ height: "300px" }}>我是占位 3，高度300px</div>
      <AutoFixed bottom="0px" height="20px">
        <div style={{ backgroundColor: "#bababa" }}>
          我是悬浮内容，距离底部为 0px，一直吸底。
        </div>
      </AutoFixed>
    </div>
  );
};

export default AutoFixedDemo;
