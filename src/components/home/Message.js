import React from "react";
import "../../css/home/Message.css";

export default function Message(props) {
    
    return (
        <div className={"message-line"}>
            <div className={props.sentBySelf ? "message-container sent-by-self" : "message-container"}>
                <div className={props.sentBySelf ? "message sent-by-self" : "message"}>
                    {props.message.message + props.message.message + props.message.message + props.message.message + props.message.message + props.message.message + props.message.message + props.message.message + props.message.message}  
                </div>
            </div>

        </div>

    );
}