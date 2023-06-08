import React, { useEffect, useRef } from "react";
import axios from "axios";
import "../../css/home/HomePage.css";
import { faAdd, faEdit, faLineChart, faNavicon, faPaperPlane, faPlus, faPowerOff, faSearch, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MenuOptions from "../../components/home/MenuOptions";
import AddChatWindow from "../../components/home/AddChatWindow";
import ViewProfileWindow from "../../components/home/ViewProfileWindow";
import ViewFoundUsers from "../../components/home/ViewFoundUsersAndChats";
import ViewFoundChats from "../../components/home/ViewFoundChats";
import SelectedChat from "../../components/home/SelectedChat";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Menu from "../../components/home/Menu";
import SearchBar from "../../components/home/SearchBar";
import Commands from "../../components/home/Commands";
import Chats from "../../components/home/Chats";

const API_URL = "http://localhost:8080";

var stompClient = null;

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
    const [selectedChat, setSelectedChat] = useState(null); 
    const [mode, setMode] = useState("search");

    const [chatsAndMessages, setChatsAndMessages] = useState({});
    const [selectedChatMessages, setSelectedChatMessages] = useState([]);
    const [newMessageInSelectedChat, setNewMessageInSelectedChat] = useState(null);

    const searchBarRef = useRef(null);

    const getConvertedChatName = (chat) => {
        if(chat == null) return;
        if(chat.chatType == "PERSONAL") {
            const authenticatedUsername = localStorage.getItem("username");
            const hyphenIndex = chat.name.indexOf("-");
            const firstUsername = chat.name.substring(0, hyphenIndex - 1);
            const secondUsername = chat.name.substring(hyphenIndex + 2);
            console.log("First Username - " + firstUsername);
            console.log("Second Username - " + secondUsername);
            if(authenticatedUsername === firstUsername) {
                return secondUsername;
            }
            return firstUsername;
        }
        return chat.name;
    }

    const onReceivePrivateMessage = (message) => {
        let parsedMessage = JSON.parse(message.body);
        console.log(parsedMessage);
        console.log(selectedChat);
        if(selectedChat && parsedMessage.chatName === selectedChat.name) {
            let messages = selectedChatMessages.map(m => m);
            messages.push(message);
            setSelectedChatMessages(messages);
        }
        setNewMessageInSelectedChat(message);
    }

    const onConnected = () => {
        let config = {
            "Authorization" : "Bearer " + localStorage.getItem("token"),
        };
        stompClient.subscribe("/user/" + localStorage.getItem("username") + "/private", onReceivePrivateMessage, {});
    }

    const onError = (error) => {
        console.log("could not connect");
        console.log(error);
    }

    const connect = () => {
        let socket = new SockJS(API_URL + "/ws");
        stompClient = Stomp.over(socket);
        stompClient.heartbeat.incoming = 0;
        stompClient.heartbeat.outgoing = 20000;
        const headers = {
            "Authorization" : "Bearer " + localStorage.getItem("token"),
        }
        stompClient.connect(headers, onConnected, onError);
    }

    useEffect(() => {
        fetchChats();
        connect();
    }, []);
    const onClickMenu = () => {
        setShowMenuOptions(!showMenuOptions);
        setShowAddChatWindow(false);
        setShowProfileWindow(false);
        setSearchBarValue("");
        setSearchBarPlaceholder("");
        setFoundUsers([]);
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
        setMode("");
        setSelectedUsers([]);
    }

    const onClickNewMessage = () => {
        setSearchBarPlaceholder("Search Users");
        setShowProfileWindow(false);
        setShowAddChatWindow(false);
        setShowMenuOptions(false);
        setSearchBarValue("");
        setSearchBarPlaceholder("");
        setFoundUsers([]);
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
            console.log(res);
            fetchChats();

        }).catch(err => {
            setSearchBarValue("");
            console.log(err);
        });
    }

    const fetchChats = () => {
        console.log("fetching chats");
        axios.get(API_URL + "/chat", {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            },
            data: {}
        }).then(res => {
            setAllChats(res.data.chatDtoList);
        }).catch(err => {
            console.log(err);
        })
    }

    const fetchMessagesInChat = (chat) => {
        if(chat == null) return; 
        axios.get(API_URL + "/messages/fetch/" + chat.chatId, {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            },  
            data: {}
        }).then(res => {
            setSelectedChatMessages(res.data.messageDtoList);
        }).catch(err => {
            console.log(err);
        });
    }

    const selectPersonalChat = (chat) => {
        setSelectedChat(chat);
        fetchMessagesInChat(chat);
        setNewMessageInSelectedChat(null);
    }

    return (
        <div className="main">
            <div className="sidebar" onMouseEnter={() => setSidebarOnHover(true)} onMouseLeave={() => setSidebarOnHover(false)}>
                <Commands onClickMenu={onClickMenu} 
                          searchBarPlaceholder={searchBarPlaceholder}
                          searchBarRef={searchBarRef}
                          onSearchBarChange={onSearchBarChange} />
                <Chats showMenuOptions={showMenuOptions}
                       showAddChatWindow={showAddChatWindow}
                       showProfileWindow={showProfileWindow}
                       searchBarValue={searchBarValue}
                       foundUsers={foundUsers}
                       foundChats={foundChats}
                       mode={mode}
                       selectedChat={selectedChat}
                       allChats={allChats}
                       selectPersonalChat={selectPersonalChat}
                       sidebarOnHover={sidebarOnHover}
                       onClickViewProfileWindowButton={onClickViewProfileWindowButton}
                       onClickAddChatButton={onClickAddChatButton}
                       onClickNewMessage={onClickNewMessage}
                       onClickNewGroup={onClickNewGroup}
                       createPersonalChat={createPersonalChat}
                       selectSingleUser={selectSingleUser} />
            </div>
            {
                selectedChat &&
                <SelectedChat selectedChat={selectedChat} stompClient={stompClient} messages={selectedChatMessages} newMessage={newMessageInSelectedChat}/>
            }
        </div>
    );
}
