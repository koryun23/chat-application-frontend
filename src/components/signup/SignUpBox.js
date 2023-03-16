import React from "react";
import "../../css/signup/SignUpBox.css";
import { useState } from "react";

export default function SignUpBox(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleSecondNameChange = (event) => {
        setSecondName(event.target.value);
    }

    const clickSignUpButton = (event) => {
        event.preventDefault();
        props.onSuccessfulRegistration(username, password, firstName, secondName);
    }
    
    return (
        <div className="sign-up-box">
            <h1 className="sign-up-box-description">Member Sign Up</h1>
            <form className="sign-up-form">
                <input type="text"
                       className={props.errorMessages.length == 0 ? "input" : "input error"} 
                       onChange={(event) => handleUsernameChange(event)}
                       value={username} 
                       placeholder="Username"/>
                <input type="password"
                       className={props.errorMessages.length == 0 ? "input" : "input error"} 
                       onChange={(event) => handlePasswordChange(event)}
                       value={password} 
                       placeholder="Password"/>
                <input type="text"
                       className={props.errorMessages.length == 0 ? "input" : "input error"} 
                       onChange={(event) => handleFirstNameChange(event)}
                       value={firstName} 
                       placeholder="First Name"/>
                <input type="text"
                       className={props.errorMessages.length == 0 ? "input" : "input error"} 
                       onChange={(event) => handleSecondNameChange(event)}
                       value={secondName} 
                       placeholder="Second Name"/>
            </form>
            {
                props.errorMessages.length > 0 ? <p className="error-message">{props.errorMessages[0]}</p> : <br></br>
            }
            <a className="sign-up-button" onClick={(event) => clickSignUpButton(event)} href="/">
                    SIGN UP
            </a>
            <p className="sign-in-text">Already have an account? <a href="/auth" className="sign-in-link">Sign in</a></p>
        </div>
    );
}