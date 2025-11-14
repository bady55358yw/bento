import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  //   index("routes/home.tsx"),

  layout("./layouts/BaseLayout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("stores", "./routes/stores/index.tsx"),
    route("stores/new/step-1", "./routes/stores/new/step1.tsx"),
    route("stores/new/step-2", "./routes/stores/new/step2.tsx"),
    route("stores/new/step-3", "./routes/stores/new/step3.tsx"),
    route("stores/edit/:storeId", "./routes/stores/edit.tsx"),
  ]),
] satisfies RouteConfig;
