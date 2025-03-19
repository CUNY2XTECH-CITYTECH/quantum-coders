import React from "react";
import Header from "./HomePage/header"; 
const PostPage: React.FC = () => {
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial",
        flex: 1, 
        justifyContent: 'center', 
        alignItems:"center"
    };
    return (
        <div style={mystyle}>       
            <Header/>
            <h1>Our user post section!</h1>
            <p> </p>
            <div>
                <p> SOMETHING </p>
            </div>
        </div>
    );
};

export default PostPage;