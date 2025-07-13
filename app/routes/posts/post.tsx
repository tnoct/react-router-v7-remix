import { useLoaderData } from "react-router";
import { getPost } from "~/models/post.model";
import type { Route } from "./+types/post";

/* 
So on this page first loader will run on the server side and the after that
on Client side the `clientLoader()` will be wait for the server `loader()` to complete and 
after that we will get the data return by the `loader()` in the clientLoader()` function via args.


Reference link from react-router framework documentation : https://reactrouter.com/start/framework/data-loading#using-both-loaders
*/

export async function loader({ params }: Route.LoaderArgs) {
  return getPost(parseInt(params.id));
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverdata = await serverLoader();
  console.log(serverdata);
  return serverdata;
}

// force the client loader to run during hydration
clientLoader.hydrate = true as const; // `as const` for type inference

export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="mr-1 size-10 text-zinc-900 motion-safe:animate-spin"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="text-center mt-4">Loading your post</span>
    </div>
  );
}

const Post = ({}: Route.ComponentProps) => {
  const post = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {post?.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {post?.content}
        </p>
        <a
          href="#"
          className="inline-flex font-medium items-center text-blue-600 hover:underline"
        >
          {post?.published ? "Has been Published" : "Un Published"}
        </a>
      </div>
    </div>
  );
};

export default Post;
