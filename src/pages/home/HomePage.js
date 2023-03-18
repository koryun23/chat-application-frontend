import React, { useEffect, useRef } from "react";
import axios from "axios";
import "../../css/home/HomePage.css";
import { faAdd, faEdit, faLineChart, faNavicon, faPlus, faPowerOff, faSearch, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MenuOptions from "../../components/home/MenuOptions";
import AddChatWindow from "../../components/home/AddChatWindow";
import ViewProfileWindow from "../../components/home/ViewProfileWindow";
import ViewFoundUsers from "../../components/home/ViewFoundUsers";
import ViewFoundChats from "../../components/home/ViewFoundChats";

const API_URL = "http://localhost:8080";

export default function HomePage(props) {

    const [searchBarPlaceholder, setSearchBarPlaceholder] = useState("");
    const [searchBarValue, setSearchBarValue] = useState("");

    const [sidebarOnHover, setSidebarOnHover] = useState(false);

    const [showMenuOptions, setShowMenuOptions] = useState(false);
    const [showAddChatWindow, setShowAddChatWindow] = useState(false);
    const [showProfileWindow, setShowProfileWindow] = useState(false);

    const [allChats, setAllChats] = useState([]);
    const [foundUsers, setFoundUsers] = useState([]);
    const [foundChats, setFoundChats] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [mode, setMode] = useState("search");

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
        setSearchBarValue("");
        setSearchBarPlaceholder("");
        setFoundUsers([]);
        setFoundChats([]);
        setMode("");
        setSelectedUsers([]);
    }

    const onClickAddChatButton = () => {
        setShowAddChatWindow(!showAddChatWindow);
        setShowMenuOptions(false);
        setShowProfileWindow(false);
        setSearchBarValue("");
        setSearchBarPlaceholder("");
        setFoundUsers([]);
        setFoundChats([]);
        setMode("");
        setSelectedUsers([]);
    }

    const onClickViewProfileWindowButton = () => {
        setShowProfileWindow(!showProfileWindow);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        setSearchBarPlaceholder("");
        setSearchBarValue("");
        setFoundUsers([]);
        setFoundChats([]);
        setMode("");
        setSelectedUsers([]);
        console.log(showProfileWindow);

    }

    const onClickNewMessage = () => {
        setSearchBarPlaceholder("Search Users");
        setShowProfileWindow(false);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        setSearchBarValue("");
        setSearchBarPlaceholder("");
        setFoundUsers([]);
        setFoundChats([]);
        setMode("new-message");
        setSelectedUsers([]);
        searchBarRef.current.focus();
    }

    const onClickNewGroup = () => {
        setSearchBarPlaceholder("Search Users");
        setShowProfileWindow(false);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        setSearchBarValue("");
        setFoundUsers([]);
        setFoundChats([]);
        setMode("new-group");
        setSelectedUsers([]);
        searchBarRef.current.focus();
    }

    const onSearchBarChange = (event) => {
        setShowProfileWindow(false);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        setSearchBarValue(event.target.value);
        searchWithKeyWord(event.target.value);
        if(event.target.value == '') {
            setFoundUsers([]);
        }
    }

    const searchWithKeyWord = (keyWord) => {
        if(!keyWord) return;
        console.log(localStorage.getItem("token"));
        axios.get(API_URL + "/search/" + keyWord, {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            },
            data: {}
        })
        .then(res => {
            console.log(res.data);
            const users = res.data.userDtoList;
            const chats = res.data.chatDtoList;
            setFoundUsers(users.map(user => user));
            setFoundChats(chats.map(chat => chat));
        })
        .catch(err => {
            console.log(err);
        })
    }

    const selectSingleUser = (user) => {
        createPersonalChat(user);
        setShowProfileWindow(false);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        setSearchBarPlaceholder("");
        setSearchBarValue("");
        setFoundUsers([]);
        setFoundChats([]);
        setMode("");
        setSelectedUsers([]);
    }
    
    const addSingleUser = (user) => {
        const currentUsers = selectedUsers.map(user => user);
        currentUsers.push(user);
        setSelectedUsers(currentUsers);
    }

    const createPersonalChat = (user) => {
        axios.post(API_URL + "/chat/create", {
                name : localStorage.getItem("username") + " - " + user.username,
                chatType : "PERSONAL"
            },
            {headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            }} 
        ).then(res => {
            console.log(res.data);
            const chatData = res.data;
            axios.post(API_URL + "/user-chat/create", {
                chatId: chatData.id,
                addedUserUsername: user.username,
                userChatRoleType: "CHAT_ADMIN"
            }, 
            {headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            }}).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });
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
                               onChange={(event) => onSearchBarChange(event)}
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
                    <ViewFoundUsers foundUsers={foundUsers} onClick={mode == "new-message" ? (user) => selectSingleUser(user) : mode=="new-group" ? (user) => addSingleUser(user) : () => console.log(mode)} /> 
                    <ViewFoundChats foundChats={foundChats} />
                    
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
