import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterSideBar from './FilterSidebar/FilterSidebar';

export default function FilterCategory() {
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
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
                    <MenuItem value={10}>Electronics</MenuItem>
                    <MenuItem value={20}>Mobile Phone</MenuItem>
                    <MenuItem value={30}>Laptop</MenuItem>
                    <MenuItem value={40}>Camera</MenuItem>
                    <MenuItem value={50}>Man's Clothing</MenuItem>
                    <MenuItem value={60}>Women's Clothing</MenuItem>
                </Select>
                <FormHelperText>

                </FormHelperText>
            </FormControl>

            <FilterSideBar />

        </div>
    );
}