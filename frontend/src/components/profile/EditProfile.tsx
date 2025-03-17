import { useState } from "react";
import './profile.css';
import { useNavigate } from "react-router-dom";
//import { updateUserMetadata } from "supertokens-auth-react/recipe/usermetadata";

interface EditingProfile {
  setStatusEditing: (status: boolean) => void;
  
}

interface UserData {
  name: string;
  username: string;
  description: string;
}
  /*
//tigris
interface FileData {
  Key: string;
  Url: string;
  LastModified: string;
}
*/

export default function EditingProfile({ setIsEditing, userData, setUserData }: { setIsEditing: (status: boolean) => void; userData: UserData; setUserData: (data: UserData) => void; }) {
  const [name, setName] = useState(userData.name || "John Doe");
  const [username, setUsername] = useState(userData.username || "johndoe");
  const [description, setDescription] = useState(userData.description || "Hello World");
  const navigate = useNavigate();
  /*
  //TIGRIS
    const [files, setFiles] = useState<FileData[]>([]);
  const { loading, doesSessionExist } = useSession();

  useEffect(() => {
    if (!loading && doesSessionExist) {
      fetchFiles();
    }
  }, [loading, doesSessionExist]);

  const fetchFiles = async () => {
    try {
      const response = await SuperTokens.fetch("/api/files", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data: FileData[] = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileInput = document.getElementById("files") as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];

    try {
      const base64Data = await getBase64(file);
      await SuperTokens.fetch("/api/upload_files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, data: base64Data }),
      });
      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  */
  /*
  //help here mainly
  const handleUpload = async (e: React.FormEvent) => {
    const handleSave = async () => {
    const newMetadata = { name, username, description };
    await updateUserMetadata(newMetadata);
    setUserData(newMetadata);
    setIsEditing(false);
  };*/
  const handleSave = async () => {
    console.log('test')
    navigate("/");
  }

  return (
    <div className="profile-card">
      <h2>Edit Profile</h2>
      {/*
      File Upload Form 
      <form onSubmit={handleUpload}>
        <input type="file" id="files" />
        <button type="submit">Upload your pfp</button>
      </form>
      */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );//onClick={handleSave}
}
