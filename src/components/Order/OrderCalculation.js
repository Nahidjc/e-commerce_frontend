import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

const TAX_RATE = 0.07;
let sum = 0;
function ccyFormat(num) {
    let num1 = Number(num)
    return `${num1.toFixed(2)}`;
}

function priceRow(qty, unit) {
    let num1 = Number(qty)
    let num2 = Number(unit)
    sum = sum + (num1 * num2)
    return num1 * num2;
}
function priceAdd(qty, unit) {
    let num1 = Number(qty)
    let num2 = Number(unit)
    return num1 + num2;
}

// function createRow(desc, qty, unit) {
//     const price = priceRow(qty, unit);
//     return { desc, qty, unit, price };
// }

// function subtotal(items) {
//     return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const rows = [
//     createRow('Paperclips (Box)', 100, 1.15),
//     createRow('Paper (Case)', 10, 45.99),
//     createRow('Waste Basket', 2, 17.99),
// ];

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;
const OrderCalculation = () => {

    const orderDetails = useSelector(state => state.orderDetails)
    const { order } = orderDetails;
    console.log(order.orderItems);
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



