import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../css/home/ViewChat.css";
import { faMessage, faUserGroup } from '@fortawesome/free-solid-svg-icons';

export default function ViewChat(props) {

    const getConvertedChatName = (chat) => {
        if(chat.chatType == "PERSONAL") {
            const authenticatedUsername = localStorage.getItem("username");
            const hyphenIndex = chat.name.indexOf("-");
            const firstUsername = chat.name.substring(0, hyphenIndex - 1);
            const secondUsername = chat.name.substring(hyphenIndex + 2);
            console.log("First Username - " + firstUsername);
            console.log("Second Username - " + secondUsername);
            if(authenticatedUsername === firstUsername) {
                return secondUsername;
            }
            return firstUsername;
        }
        return chat.name;
    }
    return (
        <div className={props.showChatWindow ? props.isSelected ? "chat-window selected" : "chat-window" : "no-display"}
             onClick={() => props.onClick(props.chat)}>
            <div className="chat-info">
                <div className="icon">
                    <FontAwesomeIcon icon={props.chat.chatType === "PERSONAL" ? faMessage : faUserGroup} size="lg"/>
                </div>
                <div className={props.isSelected ? "selected-chat-name" : "chat-name"}>
                    {getConvertedChatName(props.chat)}
                </div>
            </div>
        </div>
    );
}