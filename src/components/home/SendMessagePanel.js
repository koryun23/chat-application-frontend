import React from "react";
import "../../css/home/SendMessagePanel.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const API_URL = "http://localhost:8080";

export default function SendMessagePanel(props) {

    const [messageInputPlaceholder, setMessageInputPlaceholder] = useState("Message");
    const [messageInputValue, setMessageInputValue] = useState("");
    const messageInputRef = useRef(null);

    const onMessageInputChange = (event) => {
        setMessageInputValue(event.target.value);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        console.log("sending a message");
        const chat = props.selectedChat;
        const stompClient = props.stompClient;

        if(chat.chatType === "PERSONAL") {
            let payload = {
                "message" : messageInputValue,
                "sentTo" : getSentTo(chat),
                "sentBy" : localStorage.getItem("username")
            }
            let config = {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            }

            stompClient.send("/app/private-message", config, JSON.stringify(payload));
            axios.post(API_URL + "/private-message/save", payload, config).then(props.onSend).catch(err => console.log(err));
        } else if(chat.chatType === "GROUP") {
            // TODO: send an http request apart from the stomp request
            stompClient.send("/app/public-message", {}, JSON.stringify(
                {
                    "message" : messageInputValue,
                    "sentBy" : localStorage.getItem("username"),
                    "chat" : chat.name
                }
            ))
        }
        props.onSend();

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
            <button className="send-message-button" onClick={(event) => sendMessage(event)}>
                <FontAwesomeIcon icon={faPaperPlane} size="lg"/>
            </button>
        </div>
    );
}