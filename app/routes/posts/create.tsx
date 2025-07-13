import { Form, redirect, useActionData } from "react-router";
import { createPost } from "~/models/post.model";
import type { Route } from "./+types/create";

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let title = formData.get("title");
  let content = formData.get("content");
  createPost(title as string, content as string, true);
  return redirect("/posts");
}

const CreatePost = () => {
  const actionData = useActionData<typeof action>();
  console.log("actionData", actionData);
  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <Form method="post" className="min-w-2xl mx-auto">
        <h1 className="text-3xl text-right uppercase font-medium my-2">
          Creating a Post
        </h1>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Post title"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your post content here..."
            required
            rows={4}
          />
        </div>
        <div className="flex items-center mb-5">
          <input
            id="publish"
            name="publish"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
          <label
            htmlFor="publish"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Publish
          </label>
        </div>
        <button
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Post
        </button>
      </Form>
    </div>
  );
};

export default CreatePost;
