import React from "react";
// import SearchBar from "material-ui-search-bar";
// import LinearProgress from "@material-ui/core/LinearProgress";


// this is re-rendered whenever the relevant parts of the used data stores change

const Searchbar = () => {
    const searchText = (e) => {
        console.log(e);

    }
    return (
        <div className="searchbar container mb-5">
            {/* <SearchBar
                onChange={(e) => searchText()}
                placeholder="Search Products ..."
                autoFocus

            /> */}
            {/* <LinearProgress /> */}
        </div>
    );
};




export default Searchbar;