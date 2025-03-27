import { useState, useEffect } from "react";
import './profile.css';
import { useNavigate } from "react-router-dom";
//import { useSession } from "supertokens-auth-react/recipe/session"; // Corrected import

interface UserData {
  fullName: string;
  username: string;
  description: string;
}

interface FileData {
  Key: string;
  Url: string;
  LastModified: string;
}

export default function EditingProfile({
  userData,
  setIsEditing,
  setUserData,
}: {
  setIsEditing: (status: boolean) => void;
  userData: UserData;
  setUserData: (data: UserData) => void;
  fetchUserInfo: () => void; // new prop
}) {


  const [fullName, setFullName] = useState(userData.fullName || "John Doe");
  const [username, setUsername] = useState(userData.username || "johndoe");
  const [description, setDescription] = useState(userData.description || "Hello World");
  
  const [files, setFiles] = useState<FileData[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  setFullName(userData.fullName || "John Doe");
  setUsername(userData.username || "johndoe");
  setDescription(userData.description || "Hello World");
}, [userData]);


  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data: FileData[] = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileInput = document.getElementById("files") as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:3001/api/upload_files", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("✅ File uploaded successfully");
        fetchFiles();
      } else {
        console.error("❌ Upload failed:", response.status);
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
    }
  };
  

  const handleSaveProfile = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/edit_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, description }),
        credentials: "include",
      });
  
      if (response.ok) {
        // ✅ Log the updated data
        console.log("✅ Profile updated successfully:");
        console.log("Full Name:", fullName);
        console.log("Username:", username);
        console.log("Description:", description);
  
        // Optionally update your local state
        setUserData({ fullName, username, description });
        console.log("✅ Profile updated");
        setIsEditing(false); // Go back to Profile view
        setIsEditing(false);
        navigate("/"); // Redirect if you want
      } else {
        console.error("❌ Failed to update profile. Server returned:", response.status);
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };
  

  return (
    <div className="profile-card">
      <h2>Edit Profile</h2>

      <form onSubmit={handleFileUpload}>
        <input type="file" id="files" />
        <button type="submit">Upload your profile picture</button>
      </form>

      <img src={files[0]?.Url} alt="profile" />

      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <button className="save-button" onClick={handleSaveProfile}>Save</button>
    </div>
  );
}