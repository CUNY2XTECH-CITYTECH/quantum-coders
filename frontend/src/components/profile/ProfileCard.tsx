import dogImage from "./test/image_dog.png";
import { FaPenSquare } from "react-icons/fa";
interface UserData {
  fullName?: string;
  username?: string;
  description?: string;
  profileImage?: string; // Uploap the pfp
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
        <img src={userData.profileImage || dogImage} alt="Profile" />
        <h2>{userData.fullName || "Unknow"}</h2>
        <p>@{userData.username || "MisteryPerson"}</p>
        <p>{userData.description || "Hello World and beutiful person who read me"}</p>
      </div>
    </div>
  );
}
