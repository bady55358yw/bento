import {
  type RouteConfig,
  layout,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),

  // Header 有 logo + 登出按鈕 → 已登入，並且非新增/編輯/管理畫面
  layout("./layouts/MainLayout.tsx", [
    route("stores", "./routes/stores/index.tsx"), // 店家列表
  ]),

  // Header 只有 logo → 已登出
  layout("./layouts/SimpleLayout.tsx", [
    route("login", "./routes/auth/login.tsx"),
  ]),

  // 隱藏 Header → 已登入，並且在新增/編輯/管理畫面
  layout("./layouts/EmptyLayout.tsx", [
    
    layout("./routes/stores/new/newContainer.tsx", [ // 新增店家
      route("stores/new/step-1", "./routes/stores/new/step1.tsx"), // 步驟一
      route("stores/new/step-2", "./routes/stores/new/step2.tsx"), // 步驟二
      route("stores/new/step-3", "./routes/stores/new/step3.tsx"), // 步驟三
    ]),

    route("stores/edit/:storeId", "./routes/stores/edit.tsx"), // 修改店家（單一）
    route("stores/:storeId", "./routes/stores/[storeId]/index.tsx"), // 店家管理（單一）
  ]),
] satisfies RouteConfig;
