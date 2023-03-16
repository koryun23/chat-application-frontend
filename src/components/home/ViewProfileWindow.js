import { faMale, faPerson, faPersonCirclePlus, faPersonCircleQuestion, faUser, faUserAlt, faUserAltSlash, faUserAstronaut, faUserCircle, faUserEdit, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../css/home/ViewProfileWindow.css";

export default function ViewProfileWindow(props) {

    return (
        <div className={props.showProfileWindow ? "profile-window" : "no-display"}>
            <div className="user-info">
                <div className="icon">
                    <FontAwesomeIcon icon={faUserCircle} size="lg"/>
                </div>
                <div className="full-name">
                    {props.profile.firstName + " " + props.profile.secondName}
                </div>
            </div>

            <div className="username">
                {props.profile.username}
            </div>

        </div>
    );
}