import { Form, redirect, useLoaderData } from "react-router";
import { getPost, updatePost } from "~/models/post.model";
import type { Route } from "./+types/edit";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(parseInt(params.id));
  return post;
}

export async function action({ request, params }: Route.ActionArgs) {
  let formData = await request.formData();
  let title = formData.get("title");
  let content = formData.get("content");
  const updates = await updatePost(
    title as string,
    content as string,
    parseInt(params.id)
  );
  console.log(updates);
  return redirect("/posts");
}

const EditPost = (props: Route.ComponentProps) => {
  const post = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex items-start w-full justify-center">
        <Form method="post" className="min-w-2xl mx-auto">
          <h1 className="text-3xl text-right uppercase font-medium my-2">
            Updating a Post
          </h1>
          <p className="text-right">Post owner is {post?.author?.name}</p>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              defaultValue={post?.title}
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
              defaultValue={post?.content as string}
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
              defaultChecked={post?.published}
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
      <div className="flex items-start w-full justify-center">
        <Form action="delete" method="post" className="min-w-2xl mx-auto">
          <button
            type="submit"
            className="text-white w-full bg-red-500 mt-3 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Delete Post
          </button>
        </Form>
      </div>
    </>
  );
};

export async function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.log("Error : ", Error);
  return <p>Ops Something went wrong! while editing the post</p>;
}

export default EditPost;
