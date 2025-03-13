//wei part
//yuzhen code

import { useState } from "react";
import dogImage from "./test/image_dog.png"; // Import the local image
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

export default function ProfileCard() {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [description, setDescription] = useState("Hello World");

  return (
    <div className="profile-card">
      <div className="profile-content">
      <img className="profile-image" src={dogImage} alt="Profile" />
        <h2>{name}</h2>
        <p>@{username}</p>
        <button className="edit-button">Edit</button>
        <p>{description}</p>
      </div>
    </div>
  );
}
