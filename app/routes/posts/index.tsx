import { Link, useLoaderData } from "react-router";
import { getPosts } from "~/models/post.model";
import type { Route } from "./+types";

export async function loader() {
  return getPosts();
}

const Posts = () => {
  const posts = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Link
        className="bg-zinc-900 text-white px-5 py-3 rounded-2xl my-5"
        to="create"
      >
        Create New Post
      </Link>
      <table className="table-auto md:table-fixed">
        <thead>
          <tr>
            <th>Title</th>
            <th>Auther Name</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const { title, author, content, id } = post;
            return (
              <tr key={id}>
                <td>{title}</td>
                <td>{author?.name}</td>
                <td>{content}</td>
                <td>
                  <Link to={`/posts/${id}`}>Check post</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export async function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.log("Error : ", error);
  return <p>Ops Something went wrong!</p>;
}

export default Posts;
