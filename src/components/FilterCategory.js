import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterSideBar from './FilterSidebar/FilterSidebar';
import { listProducts } from '../actions/productActions';
import { useDispatch } from 'react-redux';

export default function FilterCategory() {
    const [category, setCategory] = React.useState('');
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(listProducts({ "searchValue": event.target.value }));
        console.log(category);

    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-helper-label">Product Category</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={category}
                    label="Product Category"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Mobile Phone">Mobile Phone</MenuItem>
                    <MenuItem value='Laptop'>Laptop</MenuItem>
                    <MenuItem value='Camera'>Camera</MenuItem>
                    <MenuItem value="Man's Clothing">Man's Clothing</MenuItem>
                    <MenuItem value="Women's Clothing">Women's Clothing</MenuItem>
                </Select>
                <FormHelperText>

                </FormHelperText>
            </FormControl>

            <FilterSideBar />

        </div>
    );
}