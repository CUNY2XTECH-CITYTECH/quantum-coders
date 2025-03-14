import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the type for a post
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // To navigate to the post page

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post Feed</h1>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)} // Navigate to post page
            className="p-4 border rounded cursor-pointer hover:bg-gray-100 transition"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">By {post.author}</p>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostFeed;
