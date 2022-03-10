import React, { useState } from 'react';
import { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../../actions/orderActions';


const MyOrder = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const myOrderList = useSelector(state => state.myOrderList)
    const { loading, error, orders } = myOrderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        console.log(orders);
        if (userInfo ) {
            dispatch(getMyOrders())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, userInfo])



    return (
        <Container>

        
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">PAID</TableCell>
            <TableCell align="right">DELIVERED</TableCell>
            <TableCell align="right">DETAILS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.createdAt}
              </TableCell>
              <TableCell align="right">{order.totalPrice}</TableCell>
              <TableCell align="right">{order.isPaid}</TableCell>
              <TableCell align="right">{order.isDelivered}</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    );
};

export default MyOrder;