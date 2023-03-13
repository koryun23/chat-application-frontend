import React from "react";
import "../../css/home/HomePage.css";
import { faLineChart, faNavicon, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
export default function HomePage(props) {

    const [colorClass, setColorClass] = useState("not-clicked-menu-button-color");
    const onLogOut = () => {
        localStorage.clear();
    }

    return (
        <div className="main">
            <div className="sidebar">
                <div className="commands">
                    <div className="menu">
                        <button className="menu-button">
                            <FontAwesomeIcon icon={faNavicon} size="lg"/>
                        </button>
                    </div>
                    <div className="search-bar">
                        <input type="text"
                               className="search-input"/>
                    </div>
                </div>

                <div className="chats">

                </div>
            </div>

            <div className="selected-chat">

            </div>
        </div>
    );
}
