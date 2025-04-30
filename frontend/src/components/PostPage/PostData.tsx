import ReactDOM from 'react-dom';
import Post from './Post';

// Fixed postData with 'id' for each comment
const postData = {
  title: 'How to Create a Post Page with Comments',
  content: 'This is a tutorial on how to create a post page with comments using React.',
  comments: [
    { id: '1', text: 'Great tutorial!', author: 'Alice' },
    { id: '2', text: 'Very helpful, thanks!', author: 'Bob' }
  ]
};

ReactDOM.render(<Post post={postData} />, document.getElementById('root'));
