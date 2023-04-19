import React from "react";
import "../../css/home/SelectedChatTopPanel.css";

export default function SelectedChatTopPanel(props) {

    const getConvertedChatName = (chat) => {
        if(chat == null) return;
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
        <div className="top-panel">
            <div className="top-panel-chat-name">
                {getConvertedChatName(props.selectedChat)}
            </div>
        </div>
    );
}