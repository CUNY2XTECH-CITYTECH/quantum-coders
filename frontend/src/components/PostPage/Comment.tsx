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
      <p>{comment.text}</p>
      <small>{comment.author}</small>
    </div>
  );
};

export default Comment;
