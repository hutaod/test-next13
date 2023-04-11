export const isBrowser = typeof window === "object"

export function log(...args: any[]) {
  console.log(`${isBrowser ? "browser render" : "server render"}: `, ...args)
}