import React, { useEffect, useState } from "react";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
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

    
    const session = useSessionContext();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);

    async function getJWT() {
        if (await Session.doesSessionExist()) {
              //let userId = await Session.getUserId();
              //set userId = await Session.getUserId();
              let jwt = await Session.getAccessToken();
                console.log("JWT: ", jwt);
        }
  }

    const doesSessionExist = session.loading ? false : (session as any).doesSessionExist;
    const userId = session.loading ? false : (session as any).userId;

    // Fetch username from the backend
    useEffect(() => {
        getJWT();
        const fetchUsername = async () => {
            if (doesSessionExist && userId) {
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

    // Logout function
    const handleLogout = async () => {
        await signOut();
        navigate("/login");
    };

    return (
        <div className="homepage">
            <Header />
            <main className="content">
                <h2>Welcome {username ? username : "Guest"}!</h2>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </main>
        </div>
    );
};

export default Home;
