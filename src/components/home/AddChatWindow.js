import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../css/home/AddChatWindow.css";

export default function AddChatWindow(props) {

    const [options, setOptions] = useState(["New Message", "New Group"]);
    const [icons, setIcons] = useState([faUser, faUsers]);

    const onSelectAddChatOption = (index) => {
        console.log(options[index]);
    }
    const items = icons.map((icon, index) => (
        <a className="add-chat-option" id={index} onClick={() => onSelectAddChatOption(index)} href="/">
            <div className="option-icon">
                <FontAwesomeIcon icon={icon} size="lg"/>
            </div>
            <div className="option-name">
                <b>{options[index]}</b>
            </div>
        </a>
    ))
    return (
        <div className={props.showAddChatWindow ? "add-chat-window" : "add-chat-window no-display"}>
            {items}
        </div>
    );
}