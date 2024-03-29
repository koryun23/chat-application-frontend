import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../../css/home/MessagesPanel.css";

import Message from "./Message";

const API_URL = "http://localhost:8080";

export default function MessagesPanel(props) {
        
    const messagesEndReference = useRef(null);
    const [messageElements, setMessageElements] = useState([]);

    const scrollToEnd = () => {
        messagesEndReference.current.scrollIntoView({behavior: "smooth"});
    }
    
    const fetchMessageElements = () => {
        let messageElements = [];
        props.messages.map((message) => (
            messageElements.push(<Message message={message} sentBySelf={message.sentBy == localStorage.getItem("username")}/>)
        ))

        setMessageElements(messageElements);
    }

    const pushNewMessage = () => {
        if(!props.newMessage) return;
        let temp = messageElements.map(m => m);
        let message = JSON.parse(props.newMessage.body);
        if(props.newMessage) {
            temp.push(<Message message={message} sentBySelf={message.sentBy == localStorage.getItem("username")}/>)
        }
        setMessageElements(temp);
    }

    useEffect(scrollToEnd, [messageElements]); // scroll to end when messages change
    useEffect(fetchMessageElements, [props.messages]); // fetch message elements when messages change
    useEffect(pushNewMessage, [props.newMessage]); // push the newly sent message

    const dummyDiv = <div ref={messagesEndReference}></div> // a dummy div which is used to scroll to the end when a new message arrives

    return (
        <div className={props.selectedChat ? "messages" : "no-display"}>
            {messageElements}
            {dummyDiv}             
        </div>
    );
}