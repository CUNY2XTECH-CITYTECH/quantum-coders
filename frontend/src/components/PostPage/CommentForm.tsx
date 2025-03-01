import React, { useState } from 'react';

interface CommentFormProps {
  onAddComment: (newComment: { id: string; text: string; author: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (commentText && author) {
      // Generate a unique ID for the new comment (for example, using Date.now())
      const newComment = {
        id: Date.now().toString(), // Generate an ID based on the current timestamp
        text: commentText,
        author,
      };
      onAddComment(newComment); // Pass the new comment with an ID to the parent
      setCommentText('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
