import React from "react";
import { useState } from "react";
import "../../css/auth/LoginBox.css";
import axios from "axios";

const API_URL = "http://localhost:8000/";

export default function LoginBox(props) {
    const [username = "", setUsername] = useState();
    const [password = "", setPassword] = useState();
    const [errorMessages = [], setErrorMessages] = useState();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const clickLoginButton = (event) => {
        event.preventDefault();
        axios.put(API_URL + "auth", {
            username: username,
            password: password
        }).then(res => {
            const userData = res.data;
            console.log(userData);
            localStorage.setItem("username", userData.username);
            localStorage.setItem("firstName", userData.firstName);
            localStorage.setItem("secondName", userData.secondName);
            localStorage.setItem("role", userData.userAppRoleTypeList[0]);
            localStorage.setItem("token", userData.token);
            props.onSuccessfulLogin(userData.userAppRoleTypeList[0]);
        }).catch(err => {
            console.log(err);
            setErrorMessages(["Provided credentials are incorrect"]);
        });
        console.log(username, password);
    }
    return (
        <div className = "login-box">
            <h1 className="login-box-description">Welcome!</h1>
            <form className="login-form">
                <input type="text" 
                       className={errorMessages.length == 0 ? "input" : "input error"} 
                       placeholder="Username"
                       onChange={(event) => handleUsernameChange(event)}
                       value={username}/>
                <input type="password" 
                       className={errorMessages.length == 0 ? "input" : "input error"} 
                       placeholder="Password"
                       onChange={(event) => handlePasswordChange(event)}
                       value={password}/>
            </form>
            {
                errorMessages.length > 0 ? <p className="error-message">{errorMessages[0]}</p> : <br></br>
            }
            <a className="login-button" onClick={(event) => clickLoginButton(event)} href="/">
                    LOGIN
            </a>

            <p className="create-account-text">Don't have an account? <a className="create-account-link" href="/join">Sign up</a></p>
        </div>
    );
}