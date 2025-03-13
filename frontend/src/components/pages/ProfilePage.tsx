//wei

//Yuzhen Code
import Profile from "../profile/Profile";
import "../profile/profile.css";
import Header from "../HomePage/header";

export default function ProfilePage() {
  return (
    <>
    <div>
        <Header/>{/*userId={userId}*/}
    </div>
    <div className="profile-page">
      <Profile />
    </div>
    </>
  );
}
