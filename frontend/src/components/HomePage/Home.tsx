import React, { useEffect, useState } from "react";
import { /*useSessionContext,*/ signOut } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Header from "./header";

//import {getUser} from "supertokens-web-js";
//import {getUser} from "supertokens-web-js/recipe/emailpassword";
/*
NOT FETCH
*/


import Session from 'supertokens-web-js/recipe/session';

const Home: React.FC = () => {


    //const session = useSessionContext();
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    /*
    async function getJWT() {
        if (await Session.doesSessionExist()) {
            let jwt = await Session.getAccessToken();
            console.log("JWT: ", jwt);
        }
    }*/
    async function getJWT() {
        if (await Session.doesSessionExist()) {
            const jwt = await Session.getAccessToken();
            console.log("✅ JWT Retrieved: ", jwt);
        }
    }

    //const doesSessionExist = session.loading ? false : (session as any).doesSessionExist;
    //const userId = session.loading ? false : (session as any).userId;

    /*
    // Fetch username from the backend
    useEffect(() => {
        getJWT();
        const fetchUsername = async () => {
            if (doesSessionExist && userId) {
                console.log("Fetching username for user ID:", userId); // Log the user ID
                try {
                    const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
                        method: "GET",
                        credentials: "include", // Ensures session is sent
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.username);
                    } else {
                        console.error("❌ Failed to fetch username");
                    }
                } catch (error) {
                    console.error("🚨 Error fetching username:", error);
                }
            }
        };
        fetchUsername();
    }, [doesSessionExist, userId]);
    */
    useEffect(() => {
        const fetchUserData = async () => {
            if (await Session.doesSessionExist()) {
                try {
                    const response = await fetch("http://localhost:3001/user/userinfo", {
                        method: "GET",
                        credentials: "include",
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        console.log("✅ User Data:", data); // Debugging log
                        setUserId(data.userId);
                        setUsername(data.username);
                    } else {
                        console.error("❌ Failed to fetch user metadata");
                    }
                } catch (error) {
                    console.error("🚨 Error fetching user metadata:", error);
                }
            }
        };
    
        fetchUserData();
    }, []);
    



    // Logout function
    const handleLogout = async () => {
        await signOut();
        setUsername(null); // Clear username on logout
        setUserId(null);   // Clear userId
        navigate("/login"); // Redirect to login page
    };
    



    return (
        <div className="homepage">
            <Header />
            <main className="content">
                <h2>Welcome {username ? username : "Guest"}!</h2>
                <p>Your User ID: {userId || "Loading..."}</p>

                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </main>
        </div>
    );
};

export default Home;
