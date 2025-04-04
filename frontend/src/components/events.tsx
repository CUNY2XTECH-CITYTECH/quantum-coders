import React from "react";
import Header from "./HomePage/header";
import "./public.css";

const Events: React.FC = () => {
    return (
        <div>
            <Header />
            <h1 className="title">Events</h1>
            <br></br>
            <div className="event-page">
                <div className="button-group">
                    <a href="https://www.industrycity.com/" target="_blank" rel="noopener noreferrer">
                        <button>Industry City</button>
                    </a>
                    <a href="https://www.unionsquarenyc.org/" target="_blank" rel="noopener noreferrer">
                        <button>Union Square</button>
                    </a>
                    <a href="https://www.mlb.com/yankees/ballpark" target="_blank" rel="noopener noreferrer">
                        <button>Yankee Stadium</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Events;
