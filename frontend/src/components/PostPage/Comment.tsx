import React from 'react';

interface CommentProps {
  comment: {
    id: string;
    text: string;
    author: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment">
      <p><strong>{comment.author}</strong>: {comment.text}</p>
    </div>
  );
};

export default Comment;
