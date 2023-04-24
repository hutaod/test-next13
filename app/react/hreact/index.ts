function createElement(type: string, props?: Record<string, any>, ...children: any[]) {
  // componentName
  console.log("--- createElement ---")
  return {
    type: type,
    props: {
      ...props,
      children: children.map(item => {
        return typeof item === "object" && item !== null ? item : createTextElement(item);
      })
    }
  }
}

function createTextElement(text?: string | number | boolean | bigint | Symbol | null | undefined) {
  return {
    type: text,
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const HReact = {
  createElement
}

export default HReact