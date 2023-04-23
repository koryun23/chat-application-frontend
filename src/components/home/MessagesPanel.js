import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../../css/home/MessagesPanel.css";

import Message from "./Message";

const API_URL = "http://localhost:8080";

export default function MessagesPanel(props) {
    
    const [messages, setMessages] = useState([]);
    
    const messagesEndReference = useRef(null);

    const scrollToEnd = () => {
        messagesEndReference.current.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        fetchMessages();
    }, [props.selectedChat]);

    useEffect(() => {
        fetchMessages();
        if(props.update == true) props.setUpdateToFalse();
    }, [props.update, props.selectedChat])

    useEffect(scrollToEnd, [messages]);


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

    console.log(props.update);

    const messageElements = messages.map((message, index) => (
        <Message message={message} sentBySelf={message.username == localStorage.getItem("username")}/>
    ));

    return (
        <div className="messages">
            {messageElements}
            <div ref={messagesEndReference}></div>
        </div>
    );
}