import React, { useState } from "react";
import "../../css/home/ViewProfileWindow.css";

export default function ViewProfileWindow(props) {

    const [showProfileWindow, setShowProfileWindow] = useState(false);

    return (
        <div className={showProfileWindow ? "profile-window" : "profile-window no-display"}>
            <p>{props.profile.username}</p>
        </div>
    );
}