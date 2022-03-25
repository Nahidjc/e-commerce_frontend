import { React, useState } from "react";
import "./Searchbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormControl, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProducts } from "../../actions/productActions";
import { useDispatch } from "react-redux";

const Searchbar = () => {
    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearchValue(searchText);


    }

    const handleSearchProducts = () => {
        dispatch(listProducts({ "searchValue": searchValue }))

    }


    return (
        <div className="nav-container ">

            <div className="search-container">
                <Form className="d-flex align-items-center">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                        onChange={handleSearch}

                    />
                    <Button variant="outline-success" onClick={handleSearchProducts}>
                        Search
                    </Button>
                </Form>
            </div>

        </div>
    );
};




export default Searchbar;