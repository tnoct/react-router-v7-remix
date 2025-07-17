import { getUsers } from "~/models/user.model";
import type { Route } from "./+types/list";
import { Link, useLoaderData } from "react-router";

export async function loader() {
  return getUsers();
}

const List = (props: Route.ComponentProps) => {
  const users = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Link
        className="bg-zinc-900 text-white px-5 py-3 rounded-2xl my-5"
        to="create"
      >
        Create New User
      </Link>
      <table className="table-auto md:table-fixed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Their Posts</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { id, name, email, posts } = user;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <ol>
                    {posts.map((post, Indx) => {
                      const { id } = post;
                      return (
                        <li key={Indx}>
                          <Link to={`/posts/${id}`}>Check post</Link>
                        </li>
                      );
                    })}
                  </ol>
                </td>
                <td>
                  <Link to={`/users/${id}`}>Open User</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
