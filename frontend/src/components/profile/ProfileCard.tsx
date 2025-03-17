import dogImage from "./test/image_dog.png";
import { FaPenSquare } from "react-icons/fa";
interface UserData {
  name?: string;
  username?: string;
  description?: string;
}

interface ProfileCardProps {
  setIsEditing: (isEditing: boolean) => void;
  userData: UserData;
}

export default function ProfileCard({ setIsEditing, userData }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <button className="edit-button" onClick={() => setIsEditing(true)}>
      <FaPenSquare />
      </button>
      <div className="profile-content">
        <img src={dogImage} alt="Profile" />
        <h2>{userData.name || "John Doe"}</h2>
        <p>@{userData.username || "johndoe"}</p>
        <p>{userData.description || "Hello World"}</p>
      </div>
    </div>
  );
}
