import React from "react";
import "../../css/home/Message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Message(props) {
    
    console.log(props.message);
    return (
        <div className={props.sentBySelf ? "container darker" : "container"}>
            <div className={props.sentBySelf ? "message-box sent-by-self" : "message-box"}>
                {
                    !props.sentBySelf && 
                    <div className="sender-container">
                        <p className="sender">{props.message.sentBy}</p>
                    </div>
                }
                <div className={!props.sentBySelf ? "message-text-container" : ""}>
                    <p>{props.message.message}</p>
                </div>
                <span className={props.sentBySelf ? "time-right" : "time-right"}>time</span>
            </div>

        </div>

    );
}