import React from "react";
import "../../css/home/ViewFoundChats.css";

export default function ViewFoundChats(props) {

    const chats = props.foundChats.map(chat => (
        <p>{chat.name}</p>
    ));

    return (
        <div className={props.foundChats.length > 0 ? "chats-window" : "no-display"}>
            <h3 className="found-chats-description">Chats</h3>
            {chats}
        </div>
    );
}