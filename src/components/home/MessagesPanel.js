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

    useEffect(scrollToEnd, [messages]); // scroll to end when messages change

    useEffect(fetchMessages, [props.selectedChat, props.update]); // fetch messages when user selects a chat or when a new messages is sent

    useEffect(() => props.setUpdateToFalse(), [messages]) // set the message list retrieval boolean to false when messages have already been retrieved

    const messageElements = messages.map((message) => (
        <Message message={message} sentBySelf={message.username == localStorage.getItem("username")}/>
    )); // messages that are displayed on the page

    const dummyDiv = <div ref={messagesEndReference}></div> // a dummy div which is used for the scrollbar

    return (
        <div className="messages">
            {messageElements}
            {dummyDiv}             
        </div>
    );
}