import ProfileCard from "./ProfileCard";
import UserPosts from "./UserPosts";
import { useState, useEffect } from "react";
import EditingProfile from "./EditProfile";

interface UserData {
  fullName: string;
  username: string;
  description: string;
  profileImage?: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    username: "",
    description: "",
    profileImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Unified fetch from /api/user_profile
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
        fullName: data.fullName || "",
        username: data.username || "",
        description: data.description || "",
        profileImage: data.imageUrl || "",
      });

    } catch (err) {
      console.error("🚨 Error fetching profile:", err);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
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
        <EditingProfile
          userData={userData}
          setUserData={setUserData}
          setIsEditing={setIsEditing}
          fetchUserInfo={fetchUserProfile} // reused!
        />
      ) : (
        <ProfileCard
          userData={userData}
          setIsEditing={setIsEditing}
        />
      )}

      <h2>Your posts</h2>
      <UserPosts />
    </div>
  );
}
