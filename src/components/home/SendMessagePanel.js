import React from "react";
import "../../css/home/SendMessagePanel.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

const API_URL = "http://localhost:8080";

export default function SendMessagePanel(props) {

    const [messageInputPlaceholder, setMessageInputPlaceholder] = useState("Message");
    const [messageInputValue, setMessageInputValue] = useState("");
    const messageInputRef = useRef(null);

    const onMessageInputChange = (event) => {
        setMessageInputValue(event.target.value);
    }

    const sendMessage = () => {
        console.log("sending a message");
        const chat = props.selectedChat;
        const stompClient = props.stompClient;

        if(chat.chatType === "PERSONAL") {
            stompClient.send("/app/private-message", {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
            }, JSON.stringify(
                {
                    "message" : messageInputValue,
                    "sentTo" : getSentTo(chat),
                    "sentBy" : localStorage.getItem("username")
                }
            ));
            props.onSend();
        } else if(chat.chatType === "GROUP") {
            stompClient.send("/app/public-message", {}, JSON.stringify(
                {
                    "message" : messageInputValue,
                    "sentBy" : localStorage.getItem("username"),
                    "chat" : chat.name
                }
            ))
        }

        setMessageInputValue("");
    }

    
    const getSentTo = (chat) => {
        if(chat == null) return;
        if(chat.chatType == "PERSONAL") {
            const authenticatedUsername = localStorage.getItem("username");
            const hyphenIndex = chat.name.indexOf("-");
            const firstUsername = chat.name.substring(0, hyphenIndex - 1);
            const secondUsername = chat.name.substring(hyphenIndex + 2);
            if(authenticatedUsername === firstUsername) {
                return secondUsername;
            }
            return firstUsername;
        }
        return chat.name;
    }
    
    return (
        <div className="send-message-panel">
            <input type="text" 
                   placeholder={messageInputPlaceholder} 
                   ref={messageInputRef} 
                   className="message-input" 
                   onChange={(event) => onMessageInputChange(event)} 
                   value={messageInputValue}/>
            <button className="send-message-button" onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} size="lg"/>
            </button>
        </div>
    );
}