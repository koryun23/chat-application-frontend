import React from "react";
import "../../css/home/SelectedChat.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SelectedChatTopPanel from "./SelectedChatTopPanel";
import MessagesPanel from "./MessagesPanel";
import SendMessagePanel from "./SendMessagePanel";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";

export default function SelectedChat(props) {
    
    return (
        <div className={props.selectedChat !== null ? "selected-chat" : "no-display"}>
            <SelectedChatTopPanel selectedChat={props.selectedChat} />
            <MessagesPanel selectedChat={props.selectedChat}/>
            <SendMessagePanel selectedChat={props.selectedChat} stompClient={props.stompClient}/>
        </div>  
    );
}