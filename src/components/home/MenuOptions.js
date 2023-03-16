import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import "../../css/home/MenuOptions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuOptions(props) {

    const menuItems = props.options.map((option, index) => (
        <div className="menu-option" id={index} onClick={option.onClick}>
            <div className="option-icon" id={index}>
                {<FontAwesomeIcon icon={option.icon} size="lg"/>}
            </div>
            <div className="option-name" id={index}>
                <b>{option.name}</b>
            </div>
        </div>
    ));
    menuItems.push((
        <a className="menu-option" onClick={() => localStorage.clear()} href="/">
            <div className="option-icon">
                <FontAwesomeIcon icon={faPowerOff} size="lg"/>
            </div>
            <div className="option-name">
                <b>Sign Out</b>
            </div>
        </a>
    ));

    return (
        <div className={props.showMenuOptions ? "show-menu-options" : "show-menu-options no-display"}>
            {menuItems}
        </div>
    );
}