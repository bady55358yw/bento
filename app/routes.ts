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
    route("stores/step-1", "./routes/stores/new/step1.tsx"),
  ]),
] satisfies RouteConfig;
