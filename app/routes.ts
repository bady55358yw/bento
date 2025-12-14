import {
  type RouteConfig,
  layout,
  route
} from "@react-router/dev/routes";

export default [
  //   index("routes/home.tsx"),

  layout("./layouts/BaseLayout/BaseLayout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("stores", "./routes/stores/index.tsx"), // 店家列表
    route("stores/new/step-1", "./routes/stores/new/step1.tsx"), // 新增店家-步驟一
    route("stores/new/step-2", "./routes/stores/new/step2.tsx"), // 新增店家-步驟二
    route("stores/new/step-3", "./routes/stores/new/step3.tsx"), // 新增店家-步驟三
    route("stores/edit/:storeId", "./routes/stores/edit.tsx"), // 修改店家（單一）
    route("stores/:storeId", "./routes/stores/[storeId]/index.tsx"), // 店家管理（單一）
    route("test", "./routes/test.tsx"), // test
  ]),
] satisfies RouteConfig;
