import React from "react";
import "../../css/home/Message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Message(props) {
    
    return (
        <div className={props.sentBySelf ? "container darker" : "container"}>
            {!props.sentBySelf && <p className="sender">{props.message.username}</p>}
            <p>{props.message.message}</p>
            <span className={props.sentBySelf ? "time-left" : "time-right"}>{props.message.sentAt.slice(11, 16)}</span>
            {props.sentBySelf && 
            <div className="avatar">
                <FontAwesomeIcon icon={faUser} size="2x"/>
            </div>
            }
            {/* <p className={props.sentBySelf ? "time" : "time"}>{props.message.sentAt.slice(11, 16)}</p> */}
        </div>

    );
}