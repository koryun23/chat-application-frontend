import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../css/home/MessagesPanel.css";

import Message from "./Message";

const API_URL = "http://localhost:8080";

export default function MessagesPanel(props) {
    
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

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
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    const messageElements = messages.map((message, index) => (
        <Message message={message} sentBySelf={index % 2 == 0}/>
    ));

    return (
        <div className="messages">
            {messageElements}
        </div>
    );
}