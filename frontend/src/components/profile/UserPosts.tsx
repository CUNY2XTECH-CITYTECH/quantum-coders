//wei
//Yuzhen Code

export default function UserPosts() {
    const posts = [
      "First post!",
      "Learning React is fun!",
      "CSS makes styling easier!"
    ];
  
    return (
      <div className="user-posts">
        <h3>Posts</h3>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </div>
    );
  }
  