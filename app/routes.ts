import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("posts", "layouts/posts/layout.tsx", [
    index("routes/posts/list.tsx"), // Start the Post page, open by default on hitting localhost:port/posts
    route(":id", "routes/posts/post.tsx"), // Show one post.
  ]),
] satisfies RouteConfig;
