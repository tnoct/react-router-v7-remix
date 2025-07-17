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
  route("posts", "layouts/posts/layout.tsx", [
    index("routes/posts/list.tsx"), // Start the Post page, open by default on hitting localhost:port/posts
    route(":id", "routes/posts/edit.tsx"), // Show one post.
    route(":id/delete", "routes/posts/delete.tsx"), // delete one post. this route have action only and when the action completed the server return with the redirect url of posts list.
    route("create", "routes/posts/create.tsx"),
  ]),
  layout("layouts/users/layout.tsx", [
    ...prefix("users", [
      index("routes/users/list.tsx"),
      route(":id", "routes/users/edit.tsx"),
      route(":id/delete", "routes/users/delete.tsx"), // delete one user. this route have action only and when the action completed the server return with the redirect url of users list.
      route("create", "routes/users/create.tsx"),
    ]),
  ]),
  ...prefix("others", [
    index("routes/others/index.tsx"),
    route("invention", "routes/others/invention/invention.tsx"),
    route("companies", "routes/others/companies/companies.tsx"),
  ]),
  // 2nd method of nested routing
  // layout("layouts/posts/layout.tsx", [
  //   ...prefix("posts", [
  //     index("routes/posts/index.tsx"), // Start the Post page, open by default on hitting localhost:port/posts
  //     route(":id", "routes/posts/post.tsx"), // Show one post.
  //   ]),
  // ]),
] satisfies RouteConfig;
