import React from "react";
import "../../css/home/Commands.css";

import Menu from "./Menu";
import SearchBar from "./SearchBar";

export default function Commands(props) {

    return (
        <div className="commands">
            <Menu onClickMenu={props.onClickMenu}/>
            <SearchBar  searchBarPlaceholder={props.searchBarPlaceholder}
                        searchBarRef={props.searchBarRef}
                        onSearchBarChange={props.onSearchBarChange} />
        </div>
    );
}