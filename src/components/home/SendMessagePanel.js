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
        console.log(chat.name);

        if(chat.chatType === "PERSONAL") {
            console.log(chat);
            let payload = {
                "message" : messageInputValue,
                "chatName" : chat.name,
                "sentBy" : localStorage.getItem("username"),
                "sentAt" : new Date()
            };

            let config = {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            };

            stompClient.send("/app/private-message", config, JSON.stringify(payload));
            axios.post(API_URL + "/private-message/save", payload, {
                headers : config
            }).then(res => {
                console.log(res);
                props.onSend(payload);
            }
            ).catch(err => console.log(err));
            
        } else if(chat.chatType === "GROUP") {
            // TODO: send an http request apart from the stomp request
            stompClient.send("/public-message", {}, JSON.stringify(
                {
                    "message" : messageInputValue,
                    "sentBy" : localStorage.getItem("username"),
                    "chat" : chat.name
                }
            ));
            props.onSend();
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
            <button className="send-message-button" onClick={(event) => sendMessage(event)}>
                <FontAwesomeIcon icon={faPaperPlane} size="lg"/>
            </button>
        </div>
    );
}