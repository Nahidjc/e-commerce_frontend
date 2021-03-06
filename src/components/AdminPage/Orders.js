import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTotalOrders } from '../../actions/orderActions';
import Message from '../Message';
import { Bars } from 'react-loader-spinner';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';





export default function Orders() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const totalOrderList = useSelector(state => state.totalOrderList)
    const { loading, error, orders } = totalOrderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    React.useEffect(() => {

        if (userInfo) {
            dispatch(getTotalOrders())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, userInfo])
    return (
        <React.Fragment>

            {loading ? <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
                : error ? <Message variant='danger'>{error}</Message>
                    : <>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='text-center'>Order Id</TableCell>
                                    <TableCell className='text-center'>Date</TableCell>
                                    <TableCell className='text-center'>Name</TableCell>
                                    <TableCell className='text-center'>Paid On</TableCell>
                                    <TableCell className='text-center'>Ship To</TableCell>
                                    <TableCell className='text-center'>Payment Method</TableCell>
                                    <TableCell className='text-center'>Sale Amount</TableCell>
                                    <TableCell className='text-center'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell className='text-center'>#{row._id}</TableCell>
                                        <TableCell className='text-center'>{row.createdAt.substring(0, 10)}</TableCell>
                                        <TableCell className='text-center'>{row.user.name}</TableCell>

                                        <TableCell className='text-center'> {row.isPaid ? <><i className="icon checkmark" style={{ color: 'green' }}></i> Paid</> : <>
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        </>}</TableCell>
                                        <TableCell className='text-center'> {row.isDelivered ? <><i className="fas fa-shipping-fast"></i> Delivered</> : <>
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        </>}</TableCell>
                                        <TableCell className='text-center'>{row.paymentMethod}</TableCell>
                                        <TableCell className='text-center'>{`$${row.totalPrice}`}</TableCell>
                                        <TableCell align="center">
                                            <LinkContainer to={`/admin/order/${row._id}/edit`}>
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
                    </>}


        </React.Fragment>
    );
}