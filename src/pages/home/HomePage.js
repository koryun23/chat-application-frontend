import React from "react";

export default function HomePage(props) {

    const onLogOut = () => {
        localStorage.clear();
    }

    return (
        <div>
            <p>Successful log in</p>
            <a onClick={onLogOut} href="/">Log out</a>
        </div>
    );
}
