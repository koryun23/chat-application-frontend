import React from 'react';
import { useState } from 'react';
import LoginBox from '../../components/auth/LoginBox';
import "../../css/auth/LoginPage.css";

export default function Auth(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState("");
    
    if(!authenticated) {
        return (
            <div className="login-page">
                <LoginBox onLogin={() => authenticated = true}/>
            </div>
        );
    } 
    return (
        <div className="login-page">
            <p>
                Successfully logged in!
            </p>
        </div>
    )
}