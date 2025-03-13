/*import React from "react";

const Profile: React.FC = () => {
  const user = {
    username: "john_doe",
    email: "john.doe@example.com",
    bio: "A passionate developer and tech enthusiast.",
    profilePicture: "./test/image_dog.png",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img className="w-24 h-24 rounded-full" src={user.profilePicture} alt="Profile" />
      <h2 className="text-xl font-semibold mt-2">{user.username}</h2>
      <p className="text-gray-500">{user.email}</p>
      <p className="text-gray-700 text-center mt-2">{user.bio}</p>
    </div>
  );
};

export default Profile;
*/
//import {useState} from "react";
import ProfileCard from "./ProfileCard";
import UserPosts from "./UserPosts";
import "./profile.css";
export default function Profile() {
  //const [userId, setUserId] = useState<string | null>(null);
  return (
    <>
    <div className="profile-container">
      <ProfileCard />
      <UserPosts />
    </div>
    </>
  );
}
