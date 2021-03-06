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



const UserListTable = ({ users }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Admin</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                #{user._id}
                            </TableCell>
                            <TableCell align="center">{user.name}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.isAdmin ? (
                                <i className='fas fa-check' style={{ color: 'green' }}></i>
                            ) : (
                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                            )}</TableCell>
                            <TableCell align="center">
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' style={{ backgroundColor: '#c4b5b9' }} className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>

                                <Button variant='danger' style={{ backgroundColor: '#c90641' }} className='btn-sm' >
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

export default UserListTable;