import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "../../css/home/ViewFoundUsersAndChats.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewProfileWindow from "./ViewProfileWindow";
import ViewChat from "./ViewChat";

export default function ViewFoundUsersAndChats(props) {

    const users = props.foundUsers.map((user, index) => (
        <ViewProfileWindow showProfileWindow={user.username !== localStorage.getItem("username")}
                           profile={user} 
                           id={index} 
                           onClick={() => onUserClick(user)} />
    ));

    const chats = props.foundChats.map(chat => (
        <ViewChat chat={chat} showChatWindow={true} />
    ));


    const onUserClick = (user) => {
        props.onUserClick(user);
        console.log(user);
    }

    const description = props.mode == "new-message" ? "Users to write to" : props.mode == "new-group" ? "Users to add to a group" : props.searchBarValue == "" ? "" : "Users and Chats"
    
    return (
        <div className={props.foundUsers.length > 0 ? "users-window" : "no-display"}>
            <h3 className="found-users-description">{description}</h3>
            {users}
            {props.mode !== "new-message" && props.mode !== "new-group" && chats}
        </div>
    );
}