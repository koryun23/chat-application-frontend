import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../css/home/AddChatWindow.css";

export default function AddChatWindow(props) {

    const options = props.options.map((option, index) => (
        <div className="add-chat-option" id={index} onClick={option.onClick}>
            <div className="option-icon">
                <FontAwesomeIcon icon={option.icon} size="lg"/>
            </div>
            <div className="option-name">
                <b>{option.name}</b>
            </div>
        </div>
    ));
    return (
        <div className={props.showAddChatWindow ? "add-chat-window" : "add-chat-window no-display"}>
            {options}
        </div>
    );
}