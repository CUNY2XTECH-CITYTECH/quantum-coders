import ProfileCard from "./ProfileCard";
import UserPosts from "./UserPosts";
import { useState, useEffect } from "react";
import EditingProfile from "./EditProfile";

interface UserData {
  fullName: string;
  username: string;
  description: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    username: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/user/userinfo", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        console.log("✅ User Data Retrieved:", data);

        setUserData({
          fullName: data.fullName || "",
          username: data.username || "",
          description: data.description || "Nothing",
        });

      } catch (error) {
        console.error("🚨 Error fetching user info:", error);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <p className="loading-message">⏳ Loading profile...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="profile-container">
      {isEditing ? (
        <EditingProfile setIsEditing={setIsEditing} userData={userData} setUserData={setUserData} />
      ) : (
        <ProfileCard setIsEditing={setIsEditing} userData={userData} />
      )}
      <UserPosts />
    </div>
  );
}
