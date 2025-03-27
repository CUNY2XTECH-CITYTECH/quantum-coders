import ProfileCard from "./ProfileCard";
import UserPosts from "./UserPosts";
import { useState, useEffect } from "react";
import EditingProfile from "./EditProfile";

interface UserData {
  fullName: string;
  username: string;
  description: string;
  profileImage?: string; // ✅ Tigris Image URL
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    username: "",
    description: "",
    profileImage: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch user metadata (name, username, description)
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/user/userinfo", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      console.log("✅ User Data Retrieved:", data);

      setUserData(prev => ({
        ...prev,
        fullName: data.fullName ?? prev.fullName,
        username: data.username ?? prev.username,
        description: data.description ?? prev.description,
      }));
      

    } catch (error) {
      console.error("🚨 Error fetching user info:", error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch profile image from Tigris via backend /api/files
  const fetchProfileImage = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/files", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch profile image");
      const files = await res.json();
      console.log("📂 Tigris Files:", files);
      // Assuming first file is profile image
      if (files.length > 0) {
        setUserData(prev => ({
          ...prev,
          profileImage: files[0].Url,
        }));
      }
    } catch (error) {
      console.error("🚨 Error fetching profile image:", error);
    }
  };  

  useEffect(() => {
    fetchUserInfo();
    fetchProfileImage(); // ✅ Fetch image on mount
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
          fetchUserInfo={fetchUserInfo} // Optional: pass fetchUserInfo to re-fetch after edit
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
