import React, { useRef } from "react";
import "../../css/home/HomePage.css";
import { faAdd, faEdit, faLineChart, faNavicon, faPlus, faPowerOff, faSearch, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MenuOptions from "../../components/home/MenuOptions";
import AddChatWindow from "../../components/home/AddChatWindow";
import ViewProfileWindow from "../../components/home/ViewProfileWindow";

export default function HomePage(props) {

    const [searchBarPlaceholder, setSearchBarPlaceholder] = useState("");
    const [sidebarOnHover, setSidebarOnHover] = useState(false);
    const [showMenuOptions, setShowMenuOptions] = useState(false);
    const [showAddChatWindow, setShowAddChatWindow] = useState(false);
    const [showProfileWindow, setShowProfileWindow] = useState(false);

    const searchBarRef = useRef(null);

    const onLogOut = () => {
        localStorage.clear();
    }

    // nav bar options to choose
    // 1) profile
    // 2) sign out

    const onClickMenu = () => {
        setShowMenuOptions(!showMenuOptions);
        setShowAddChatWindow(false);
        setShowProfileWindow(false);
        setSearchBarPlaceholder("");
    }

    const onClickAddChatButton = () => {
        setShowAddChatWindow(!showAddChatWindow);
        setShowMenuOptions(false);
        setShowProfileWindow(false);
    }

    const onClickViewProfileWindowButton = () => {
        setShowProfileWindow(!showProfileWindow);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        setSearchBarPlaceholder("");
        console.log(showProfileWindow);

    }

    const onClickNewMessage = () => {
        setSearchBarPlaceholder("Search Users");
        setShowProfileWindow(false);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        searchBarRef.current.focus();
    }

    const onClickNewGroup = () => {
        setSearchBarPlaceholder("Search Users");
        setShowProfileWindow(false);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        searchBarRef.current.focus();
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
                               className="search-input"
                               placeholder={searchBarPlaceholder}
                               ref={searchBarRef}
                        />               
                    </div>
                </div>

                <div className="chats">
                    <MenuOptions showMenuOptions={showMenuOptions} 
                                 options = {[
                                    {name : "Profile", icon: faUser, onClick: () => onClickViewProfileWindowButton()},
                                 ]} />
                    <AddChatWindow showAddChatWindow={showAddChatWindow} 
                                   options = {[
                                    {name: "New Message", icon: faUser, onClick: () => onClickNewMessage()},
                                    {name: "New Group", icon: faUsers, onClick: () => onClickNewGroup()}
                                   ]}/>
                    <ViewProfileWindow showProfileWindow={showProfileWindow}
                                       profile={{
                                        username: localStorage.getItem("username"),
                                        firstName: localStorage.getItem("firstName"),
                                        secondName: localStorage.getItem("secondName")
                                       }}/>
                    <button className={sidebarOnHover ? "add-chat-button" : "add-chat-button no-display"} onClick={onClickAddChatButton}>
                        <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                </div>     
            </div>
            <div className="selected-chat">

            </div>  
        </div>
    );
}
