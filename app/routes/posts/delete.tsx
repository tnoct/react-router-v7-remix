import { deletePost } from "~/models/post.model";
import type { Route } from "./+types/delete";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const { id } = params;
  await deletePost({ id: parseInt(id) });
  return redirect("/posts");
}
