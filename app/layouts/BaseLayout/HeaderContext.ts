import { createContext } from "react";

// 除了 Header 沒人需要知道 mode 的值，所以 Context 傳 setter function 就好
export type HeaderMode = "full" | "withoutLogin" | "none";

export const HeaderContext = createContext((mode: HeaderMode) => {
  // 方便 debug
  console.log("HeaderContext 未正確配置");
});
