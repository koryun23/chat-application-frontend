import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "../../css/home/ViewFoundUsers.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewProfileWindow from "./ViewProfileWindow";
export default function ViewFoundUsers(props) {

    const users = props.foundUsers.map((user, index) => (
        <ViewProfileWindow showProfileWindow={true}
                           profile={user} 
                           id={index} 
                           onClick={() => console.log("click")}/>

    ));
    
    return (
        <div className={props.foundUsers.length > 0 ? "users-window" : "no-display"}>
            <h3 className="found-users-description">Users</h3>
            {users}
        </div>
    );
}