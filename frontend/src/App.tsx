import React from 'react';
import Post from './components/PostPage/Post';

const App: React.FC = () => {
  const samplePost = {
    title: 'My First Blog Post',
    content: 'This is the content of my first post!',
    comments: [
      { id: '1', text: 'Great post!', author: 'John Doe' },
      { id: '2', text: 'Thanks for sharing!', author: 'Jane Smith' },
    ],
  };

  return (
    <div className="App">
      <h1>Welcome to My Blog</h1>
      <Post post={samplePost} />
    </div>
  );
};

export default App;
