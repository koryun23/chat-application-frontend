import React, { useState } from "react";
import axios from "axios";

import "../../css/signup/SignUpPage.css";
import SignUpBox from "../../components/signup/SignUpBox";
import { Navigate } from "react-router-dom";

const API_URL = "http://localhost:8000/";

export default function SignUp(props) {

    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const onSuccessfulRegistration = (username, password, firstName, secondName) => {
        axios.post(API_URL + "join", {
            username: username,
            password: password, 
            firstName: firstName,
            secondName: secondName
        }).then(res => {
            if(res.status == 200) {
                setRedirectToLogin(true);
            }
        }).catch(err => {
            setErrorMessages(err.response.data.errors);
        });
    }

    if(redirectToLogin) {
        return <Navigate to="/auth" />
    }
    return (
        <div className="sign-up-page">
            <SignUpBox onSuccessfulRegistration={(username, password, firstName, secondName) => onSuccessfulRegistration(username, password, firstName, secondName)}
                       errorMessages={errorMessages}/>
        </div>
    );
}