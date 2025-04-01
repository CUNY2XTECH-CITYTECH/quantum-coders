import { useEffect, useState } from "react";
import basicIcon from "./test/image.png";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localUserData, setUserData] = useState<UserData>(userData);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/user_profile", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user profile");

      const data = await res.json();
      console.log("✅ User Profile:", data);

      setUserData({
        fullName: data.fullName || "NOT NAME",
        username: data.username || "NotFoundUser",
        description: data.description || "no defined",
        profileImage: data.imageUrl || "",
      });

    } catch (err) {
      console.error("🚨 Error fetching profile:", err);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-card">
      <button className="edit-button" onClick={() => setIsEditing(true)}>
        <FaPenSquare />
      </button>
      <div className="profile-content">
        <img src={localUserData.profileImage || basicIcon} alt="Profile" />
        <h2>{localUserData.fullName }</h2>
        <p className="username-pfp">@{localUserData.username }</p>
        <p>{localUserData.description}</p>
      </div>
    </div>
  );
}