import React from "react";
import { useState } from "react";
import "../../css/auth/LoginBox.css";

const API_URL = "http://localhost:8000";

export default function LoginBox(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [token, setToken] = useState("");
    const [roles, setRoles] = useState([]);
    const [auth, setAuth] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const clickLoginButton = (event) => {
        event.preventDefault();
        console.log(username, password);
    }
    return (
        <div className = "login-box">
            <h1 className="login-box-description">Welcome!</h1>
            <form className="login-form">
                <input type="text" 
                       className="input" 
                       placeholder="Username"
                       onChange={(event) => handleUsernameChange(event)}
                       value={username}/>
                <input type="password" 
                       className="input" 
                       placeholder="Password"
                       onChange={(event) => handlePasswordChange(event)}
                       value={password}/>
            </form>
            <a className="login-button" onClick={(event) => clickLoginButton(event)} href="/">
                    LOGIN
            </a>

            <p className="create-account-text">Don't have an account? <a className="create-account-link" href="/">Sign up</a></p>
        </div>
    );
}