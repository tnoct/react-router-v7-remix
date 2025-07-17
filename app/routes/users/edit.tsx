import { Form, redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/edit";
import { getUser, updateUser } from "~/models/user.model";

export async function loader({ params }: Route.ActionArgs) {
  const { id } = params;
  return getUser({ id: parseInt(id) });
}

export async function action({ request, params }: Route.ActionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  await updateUser({
    name: name as string,
    email: email as string,
    id: parseInt(id),
  });
  return redirect("/users");
}

const Edit = (props: Route.ComponentProps) => {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <Form method="post" className="min-w-2xl mx-auto">
        <h1 className="text-3xl text-right uppercase font-medium my-2">
          Updating a Post
        </h1>
        <p className="text-right">Post owner is {user?.name}</p>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            defaultValue={user?.name as string}
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="User name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <input
            type="email"
            defaultValue={user?.email as string}
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter you email here."
            required
          />
        </div>
        <button
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update user
        </button>
      </Form>
    </div>
  );
};

export default Edit;
