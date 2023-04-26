import React from "react";
import "../../css/home/Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";

export default function Menu(props) {

    return (
        <div className="menu">
            <button className="menu-button" onMouseDown={props.onClickMenu}>
                <FontAwesomeIcon icon={faNavicon} size="lg"/>
            </button>
        </div>
    );
}
