import React from "react";
import "../../css/home/ViewFoundChats.css";
import ViewChat from "./ViewChat";

export default function ViewFoundChats(props) {

    const chats = props.foundChats.map(chat => (
        <ViewChat chat={chat} showChatWindow={true} isSelected={chat.name === props.selectedChat.name} onClick={(chat) => onChatClick(chat)} />
    ));

    const onChatClick = (chat) => {
        props.onChatClick(chat);
    }

    console.log(chats);
    
    return (
        <div className={props.foundChats.length > 0 ? "chats-window" : "no-display"}>
            <h3 className="found-chats-description">Chats</h3>
            {chats}
        </div>
    );
}