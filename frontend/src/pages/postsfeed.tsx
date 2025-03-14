import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); // Navigation hook

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
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Post Feed</h1>

      {loading && <p className="text-center text-gray-600">Loading posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)} // Navigate to Post Page
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;