import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginBox from '../../components/auth/LoginBox';
import "../../css/auth/LoginPage.css";

export default function Auth(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const onSuccessfulLogin = (role) => {
        console.log(role);
        setAuthenticated(true);
        setRole(role);
    }
    if(!authenticated) {
        return (
            <div className="login-page">
                <LoginBox onSuccessfulLogin={onSuccessfulLogin} />
            </div>
        );
    } 
    props.onLogin(role);

    return (
        <Navigate to="/home"/>
    );
}