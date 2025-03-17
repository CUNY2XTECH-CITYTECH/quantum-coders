import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Header from "./header";

interface UserData {
    userId?: string;
    fullName?: string;
    username?: string;
    email?: string;
}

const Home: React.FC = () => {
    //const session = useSessionContext();
    const navigate = useNavigate();
   
    
    const [userData, setUserData] = useState<UserData | null>(null);
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await fetch("http://localhost:3001/user/userinfo", {
                    method: "GET",
                    credentials: "include", // Required for session authentication
                });

                const data = await res.json();
                console.log("User Data:", data);

                if (res.ok) {
                    setUserData({
                        userId: data.userId, // Store user ID
                        fullName: data.fullName || "Guest User",
                        username: data.username || "guest",
                        email: data.email || "No email available",
                    });
                } else {
                    console.error("Failed to fetch user info");
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);
    
    return (
        <div className="homepage">
            <Header />
            {<div className="other-buttons">
                    <button className="buttons-pageProject" onClick={() => navigate("/services" )}> Services </button>
                    <button className="buttons-pageProject" onClick={() => navigate("/aboutUs")}> About Us </button>
                    <button className="buttons-pageProject" onClick={() => navigate("/post")}> Post </button>
                </div>}
            <main className="content">
                {/*
                <h2>Welcome {username ? username : "Guest"}!</h2>
                <p>Your User ID: {userId || "Loading..."}</p>*/}
                <h1>Welcome, {userData?.fullName || "Guest"}!</h1>
                <p>Username: @{userData?.username || "guest"}</p>

                <br></br>
            </main>
        </div>
    );
};

export default Home;