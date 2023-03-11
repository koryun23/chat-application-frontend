import React from "react";
import "../../css/home/HomePage.css";

export default function HomePage(props) {

    const onLogOut = () => {
        localStorage.clear();
    }

    return (
        <div className="main">
            <div className="sidebar">
                <div className="commands">

                </div>
                <div className="search-bar">
        
                </div>
                <div className="chats">

                </div>
            </div>

            <div className="selected-chat">

            </div>
        </div>
    );
}
