import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "../../css/home/ViewFoundUsers.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewProfileWindow from "./ViewProfileWindow";
export default function ViewFoundUsers(props) {

    const users = props.foundUsers.map((user, index) => (
        <ViewProfileWindow showProfileWindow={user.username !== localStorage.getItem("username")}
                           profile={user} 
                           id={index} 
                           onClick={() => onClickUser(user)} />
    ));

    const onClickUser = (user) => {
        props.onClick(user);
        console.log(user);
    }
    
    return (
        <div className={props.foundUsers.length > 0 ? "users-window" : "no-display"}>
            <h3 className="found-users-description">{props.description}</h3>
            {users}
        </div>
    );
}