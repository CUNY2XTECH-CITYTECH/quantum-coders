import { useState, useEffect } from "react";
import './profile.css';
import { useNavigate } from "react-router-dom";

interface UserData {
  fullName: string;
  username: string;
  description: string;
}

export default function EditingProfile({
  userData,
  setIsEditing,
  setUserData,
  fetchUserInfo,
}: {
  setIsEditing: (status: boolean) => void;
  userData: UserData;
  setUserData: (data: UserData) => void;
  fetchUserInfo: () => void;
}) {
  const [fullName, setFullName] = useState(userData.fullName || "");
  const [username, setUsername] = useState(userData.username || "");
  const [description, setDescription] = useState(userData.description || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFullName(userData.fullName || "");
    setUsername(userData.username || "");
    setDescription(userData.description || "");
  }, [userData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadFileAndGetUrl = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onloadend = async () => {
        const base64Data = reader.result?.toString();
        if (!base64Data) return resolve(null);

        const response = await fetch("http://localhost:3001/api/upload_files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `profile_${Date.now()}_${selectedFile.name}`,
            data: base64Data,
          }),
          credentials: "include",
        });

        const result = await response.json();
        resolve(result.imageUrl || null);
      };

      reader.readAsDataURL(selectedFile);
    });
  };

  const handleSaveProfile = async () => {
    try {
      let imageUrl: string | null = null;
  
      // Upload the file if selected
      if (selectedFile) {
        imageUrl = await uploadFileAndGetUrl();
      }
  
      // ✅ Build request body with only non-empty fields
      const updatePayload: Record<string, string> = {};
      if (fullName.trim()) updatePayload.fullName = fullName;
      if (username.trim()) updatePayload.username = username;
      if (description.trim()) updatePayload.description = description;
      if (imageUrl) updatePayload.imageUrl = imageUrl;
  
      if (Object.keys(updatePayload).length === 0) {
        alert("Please fill in at least one field to update.");
        return;
      }
  
      const response = await fetch("http://localhost:3001/api/edit_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(updatePayload),
      });
  
      if (response.ok) {
        setUserData({
          fullName: fullName || userData.fullName,
          username: username || userData.username,
          description: description || userData.description
        });
  
        await fetchUserInfo();
        setIsEditing(false);
        navigate("/");
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

      <input type="file" id="files" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" />}

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

      <button className="save-button" onClick={handleSaveProfile}>
        Save
      </button>
    </div>
  );
}
