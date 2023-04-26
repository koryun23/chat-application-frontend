import React from "react";
import "../../css/home/SearchBar.css";
export default function SearchBar(props) {
    return (
        <div className="search-bar">
            <input type="text"
                   className="search-input"
                   placeholder={props.searchBarPlaceholder}
                   ref={props.searchBarRef}
                   onChange={(event) => props.onSearchBarChange(event)}
            />               
        </div>
    );
}