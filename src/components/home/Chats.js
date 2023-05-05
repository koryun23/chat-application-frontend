import React from "react";
import "../../css/home/Chats.css";

import MenuOptions from "./MenuOptions";
import AddChatWindow from "./AddChatWindow";
import ViewProfileWindow from "./ViewProfileWindow";
import ViewFoundUsersAndChats from "./ViewFoundUsersAndChats";
import ViewFoundChats from "./ViewFoundChats";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faEdit } from "@fortawesome/free-solid-svg-icons";
export default function Chats(props) {

    return (
        <div className="chats">
            {
                props.showMenuOptions &&
                <MenuOptions showMenuOptions={props.showMenuOptions} 
                        options = {[
                            {name : "Profile", icon: faUser, onClick: () => props.onClickViewProfileWindowButton()},
                        ]} />
            }
            {
                props.showAddChatWindow &&
                <AddChatWindow showAddChatWindow={props.showAddChatWindow} 
                options = {[
                    {name: "New Message", icon: faUser, onClick: () => props.onClickNewMessage()},
                    {name: "New Group", icon: faUsers, onClick: () => props.onClickNewGroup()}
                ]}/>
            }

            <ViewProfileWindow showProfileWindow={props.showProfileWindow}
                            profile={{
                                username: localStorage.getItem("username"),
                                firstName: localStorage.getItem("firstName"),
                                secondName: localStorage.getItem("secondName")
                            }}/>
            {props.searchBarValue !== "" && !props.showProfileWindow && !props.showMenuOptions && !props.showAddChatWindow && 
            <ViewFoundUsersAndChats foundUsers={props.foundUsers} 
                            foundChats={props.foundChats} 
                            onUserClick={props.mode == "new-message" ? (user) => props.selectSingleUser(user) : props.mode=="new-group" ? (user) => props.addSingleUser(user) : () => console.log(props.mode)} 
                            selectedChat={props.selectedChat}
                            mode={props.mode} 
                            searchBarValue={props.searchBarValue}
                            /> }
            {props.searchBarValue === "" && 
            !props.showProfileWindow && 
            !props.showMenuOptions && 
            !props.showAddChatWindow && 
            <ViewFoundChats foundChats={props.allChats} 
                            onChatClick={(chat) => props.selectPersonalChat(chat)} 
                            selectedChat={props.selectedChat} />}
            
            <button className={props.sidebarOnHover ? "add-chat-button" : "add-chat-button no-display"} onClick={props.onClickAddChatButton}>
                <FontAwesomeIcon icon={faEdit} size="lg" />
            </button>
        </div>  
    );
}