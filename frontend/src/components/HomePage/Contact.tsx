import React from "react";

const Contact: React.FC = () => {
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
            <h1>Contact Us</h1>
            <p>Feel free to reach out to us through this page.</p>
        </div>
    );
};

export default Contact;