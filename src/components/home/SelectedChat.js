import React from "react";
import axios from "axios";
import "../../css/home/SelectedChat.css";

import { useState, useEffect } from "react";
import SelectedChatTopPanel from "./SelectedChatTopPanel";
import MessagesPanel from "./MessagesPanel";
import SendMessagePanel from "./SendMessagePanel";

const API_URL = "http://localhost:8080";

export default function SelectedChat(props) {
    
    const [messages, setMessages] = useState([]);
    
    const fetchMessages = () => {
        if(props.selectedChat == null) return; 
        axios.get(API_URL + "/messages/fetch/" + props.selectedChat.chatId, {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            },  
            data: {}
        }).then(res => {
            setMessages(res.data.messageDtoList);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(fetchMessages, [props.selectedChat]);

    return (
        <div className={props.selectedChat != null ? "selected-chat" : "no-display"}>
            <SelectedChatTopPanel selectedChat={props.selectedChat} stompClient={props.stompClient} />
            <MessagesPanel selectedChat={props.selectedChat} stompClient={props.stompClient} messages={messages}/>
            <SendMessagePanel selectedChat={props.selectedChat} stompClient={props.stompClient} onSend={fetchMessages}/>
        </div>  
    );
}