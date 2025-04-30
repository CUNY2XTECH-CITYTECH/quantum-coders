import React, { useState } from 'react';
import Comment from './Comment'; // Assuming Comment component exists
import CommentForm from './CommentForm'; // Assuming CommentForm component exists

interface CommentType {
  id: string;
  text: string;
  author: string;
}

interface PostType {
  title: string;
  content: string;
  comments: CommentType[];
}

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [comments, setComments] = useState<CommentType[]>(post.comments);

  const handleAddComment = (newComment: CommentType) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h2>Comments</h2>
      <div className="comments">
        {comments.length > 0 ? (
          comments.map((comment) => <Comment key={comment.id} comment={comment} />)
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
};

export default Post;
