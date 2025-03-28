import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
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
    profileImage: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch("/api/user_profile", {
        credentials: "include",
      });
      const data = await res.json();
      setUserData({
        fullName: data.fullName || "Unknown",
        username: data.username || "unknown",
        description: data.description || "", // 👈 description included
        profileImage: data.imageUrl || "",   // 👈 profile image
      });
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      {isEditing ? (
        <EditingProfile
          userData={userData}
          setUserData={setUserData}
          setIsEditing={setIsEditing}
          fetchUserInfo={fetchUserInfo} // 🔁 refresh after saving
        />
      ) : (
        <ProfileCard
          userData={userData}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}
