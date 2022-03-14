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
import { Link, useNavigate } from 'react-router-dom';
import { getMyOrders } from '../../actions/orderActions';
import Message from '../Message';
import { Bars } from 'react-loader-spinner';
import { Typography } from '@mui/material';


const MyOrder = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const myOrderList = useSelector(state => state.myOrderList)
  const { loading, error, orders } = myOrderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin



  useEffect(() => {
    console.log(orders);
    if (userInfo) {
      dispatch(getMyOrders())
    } else {
      navigate('/login')
    }

  }, [dispatch, navigate, userInfo])



  return (
    <Container>
      {loading ? <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
        : error ? <Message variant='danger'>{error}</Message>
          :
          // <TableContainer component={Paper}>
          //   <h1 className='text-center'>My Orders</h1>
          //   <Table sx={{ minWidth: 650 }} className='text-center' aria-label="simple table">
          //     <TableHead>
          //       <TableRow>
          //         <TableCell>Order ID</TableCell>
          //         <TableCell>Date</TableCell>
          //         <TableCell >Total</TableCell>
          //         <TableCell >PAID</TableCell>
          //         <TableCell >DELIVERED</TableCell>
          //         <TableCell >DETAILS</TableCell>
          //         <TableCell ></TableCell>
          //       </TableRow>
          //     </TableHead>
          //     <TableBody>
          //       {orders.map((order) => (
          //         <TableRow
          //           key={order._id}
          //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          //         >
          //           <TableCell component="th" scope="row">
          //             #{order._id}
          //           </TableCell>
          //           <TableCell component="th" scope="row">
          //             {Date(`${order.createdAt}`)}

          //           </TableCell>
          //           <TableCell >${order.totalPrice}</TableCell>
          //           <TableCell >

          //             {order.isPaid ? order.paidAt.substring(0, 10) : (
          //               <i className='fas fa-times' style={{ color: 'red' }}></i>
          //             )}
          //           </TableCell>
          //           <TableCell >
          //             {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
          //               <i className='fas fa-times' style={{ color: 'red' }}></i>
          //             )}
          //             {order.isDelivered}</TableCell>
          //           <Link to={`/order/${order._id}`}>
          //             <TableCell >Details</TableCell>
          //           </Link>

          //         </TableRow>
          //       ))}
          //     </TableBody>
          //   </Table>
          // </TableContainer>
          <table class="ui celled table">

            <thead>

              <tr className='text-center'>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Taka</th>
                <th>Paid On</th>
                <th>DELIVERED</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className={`text-center ${order.isPaid ? 'positive' : 'negative'}`}>
                  <td>#{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? order.paidAt.substring(0, 10) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>

                  {order.isPaid ? <td ><i class="icon checkmark"></i> Paid</td> : <td > <i className='fas fa-times' style={{ color: 'red' }}></i>  Unpaid</td>}

                  <Link to={`/order/${order._id}`}>
                    <td style={{ color: 'black' }}>Details</td>
                  </Link>

                </tr>

              ))}


            </tbody>
          </table>

      }


    </Container>
  );
};

export default MyOrder;