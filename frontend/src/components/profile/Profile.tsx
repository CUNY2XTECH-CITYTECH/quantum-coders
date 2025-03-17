//import {useState} from "react";
import ProfileCard from "./ProfileCard";
import UserPosts from "./UserPosts";
import { useState, useEffect } from "react";
import EditingProfile from "./EditProfile";
//import Session from "supertokens-auth-react/recipe/session";
//import { getUserMetadata } from "supertokens-auth-react/recipe/usermetadata";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ name: "", username: "", description: "" });

  /*useEffect(() => {
    async function fetchUserMetadata() {
      if (await Session.doesSessionExist()) {
        const response = await getUserMetadata();
        if (response.metadata) {
          setUserData(response.metadata);
        }
      }
    }
    fetchUserMetadata();
  }, []);*/

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

