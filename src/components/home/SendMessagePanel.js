import React from "react";
import "../../css/home/SendMessagePanel.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

export default function SendMessagePanel(props) {

    const [messageInputPlaceholder, setMessageInputPlaceholder] = useState("Message");
    const [messageInputValue, setMessageInputValue] = useState("");
    const messageInputRef = useRef(null);

    const onMessageInputChange = (event) => {
        setMessageInputValue(event.target.value);
    }

    const sendMessage = () => {

    }
    
    return (
        <div className="send-message-panel">
            <input type="text" 
                   placeHolder={messageInputPlaceholder} 
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