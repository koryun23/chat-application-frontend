import React from "react";
import "../../css/home/HomePage.css";
import { faAdd, faEdit, faLineChart, faNavicon, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MenuOptions from "../../components/home/MenuOptions";

export default function HomePage(props) {

    const [sidebarOnHover, setSidebarOnHover] = useState(false);
    const [showMenuOptions, setShowMenuOptions] = useState(false);

    const onLogOut = () => {
        localStorage.clear();
    }

    // nav bar options to choose
    // 1) profile
    // 2) sign out

    const onClickMenu = () => {
        setShowMenuOptions(!showMenuOptions);
        console.log("clicked");
    }
    return (
        <div className="main">
            <div className="sidebar" onMouseEnter={() => setSidebarOnHover(true)} onMouseLeave={() => setSidebarOnHover(false)}>
                <div className="commands">
                    <div className="menu">
                        <button className="menu-button" onMouseDown={onClickMenu}>
                            <FontAwesomeIcon icon={faNavicon} size="lg"/>
                        </button>
                    </div>
                    <div className="search-bar">
                        <input type="text"
                               className="search-input"/>
                    </div>
                </div>

                <div className="chats">
                    <MenuOptions showMenuOptions={showMenuOptions} />

                    <button className={sidebarOnHover ? "add-chat-button" : "add-chat-button no-display"}>
                        <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                </div>     
            </div>
            <div className="selected-chat">

            </div>  
        </div>
    );
}
