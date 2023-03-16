import React from "react";
import "../../css/home/ViewFoundUsers.css";

export default function ViewFoundUsers(props) {

    const users = props.foundUsers.map((user, index) => (
        <div className="user" id={index}>
            <p>{user.username}</p>
        </div>
    ));
    
    return (
        <div className={props.foundUsers.length > 0 ? "users-window" : "no-display"}>
            {users}
        </div>
    );
}