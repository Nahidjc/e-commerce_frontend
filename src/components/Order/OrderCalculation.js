import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';


let sum = 0;

function priceRow(qty, unit) {
    let num1 = Number(qty)
    let num2 = Number(unit)
    sum = sum + (num1 * num2)
    return num1 * num2;
}


const OrderCalculation = () => {

    const orderDetails = useSelector(state => state.orderDetails)
    const { order } = orderDetails;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Product Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>


                    {order.orderItems.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">${row.price}</TableCell>
                            <TableCell align="right">${priceRow(row.price, row.qty)}</TableCell>
                        </TableRow>

                    ))}
                    <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={2}>Sub Total</TableCell>
                        <TableCell align="right">${sum}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Shipping Price</TableCell>

                        <TableCell align="right">${order.shippingPrice}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Tax</TableCell>

                        <TableCell align="right">${order.taxPrice}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total Price</TableCell>
                        <TableCell align="right">${order.totalPrice}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderCalculation;
