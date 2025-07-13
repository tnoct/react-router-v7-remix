import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // first method of nested routing
  // route("posts", "layouts/posts/layout.tsx", [
  //   index("routes/posts/index.tsx"), // Start the Post page, open by default on hitting localhost:port/posts
  //   route(":id", "routes/posts/post.tsx"), // Show one post.
  // ]),
  // 2nd method of nested routing
  layout("layouts/posts/layout.tsx", [
    ...prefix("posts", [
      index("routes/posts/index.tsx"), // Start the Post page, open by default on hitting localhost:port/posts
      route(":id", "routes/posts/post.tsx"), // Show one post.
    ]),
  ]),
] satisfies RouteConfig;
