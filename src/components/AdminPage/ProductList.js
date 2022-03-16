import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';


const ProductList = ({ products, handleDeleteProduct }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="center">Product Name</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Brand</TableCell>
                        <TableCell align="center">Stock</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                #{product._id}
                            </TableCell>
                            <TableCell align="center">{product.name}</TableCell>
                            <TableCell align="center">${product.price}</TableCell>
                            <TableCell align="center">{product.category}</TableCell>
                            <TableCell align="center">{product.brand}</TableCell>
                            <TableCell align="center">{product.countInStock}</TableCell>
                            {/* <TableCell align="center">{product.category ? (
                                <i className='fas fa-check' style={{ color: 'green' }}></i>
                            ) : (
                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                            )}</TableCell> */}
                            <TableCell align="center">
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' style={{ backgroundColor: '#c4b5b9' }} className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>

                                <Button onClick={() => handleDeleteProduct(product._id)} variant='danger' style={{ backgroundColor: '#c90641' }} className='btn-sm' >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductList;