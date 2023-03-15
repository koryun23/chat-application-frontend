import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import "../../css/home/MenuOptions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuOptions(props) {

    const [options, setOptions] = useState(["Profile", "Sign Out"]);
    const [icons, setIcons] = useState([faUser, faPowerOff]);

    const clickMenuOption = (index) => {
        const selectedOption = options[index];
        if(selectedOption == "Profile") {

        } else if(selectedOption == "Sign Out") {
            localStorage.clear();
        }
    }
    
    const menuItems = icons.map((icon, index) => (
        <a className="menu-option" id={index} onClick={() => clickMenuOption(index)} href="/">
            <div className="option-icon">
                {<FontAwesomeIcon icon={icon} size="lg" />}
            </div>
            <div className="option-name">
                <b>{options[index]}</b>
            </div>
        </a>
    ));

    return (
        <div className={props.showMenuOptions ? "show-menu-options" : "show-menu-options no-display"}>
            {menuItems}
        </div>
    );
}