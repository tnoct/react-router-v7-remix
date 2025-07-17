import { deleteUser } from "~/models/user.model";
import type { Route } from "./+types/delete";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const { id } = params;
  await deleteUser({ id: parseInt(id) });
  return redirect("/users");
}
