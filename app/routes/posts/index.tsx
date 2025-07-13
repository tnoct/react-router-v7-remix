import { Link, useLoaderData } from "react-router";
import { getPosts } from "~/models/post.model";

export async function loader() {
  return getPosts();
}

const Posts = () => {
  const posts = useLoaderData<typeof loader>();

  return (
    <div className="  min-h-screen flex items-center justify-center">
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

export default Posts;
