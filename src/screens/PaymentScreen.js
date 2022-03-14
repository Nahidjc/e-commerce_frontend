import { Radio } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { savePaymentMethod, saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
const PaymentScreen = () => {
    let location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart)
    const { shippingAdress } = cart
    const [paymentMethod, setPaymentMethod] = useState("PayPal")


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        console.log(paymentMethod);
        navigate('/placeorder')
    }
    const handlePaymentMethod = (e) => {
        e.preventDefault()

        setPaymentMethod(e.target.value)
        console.warn(paymentMethod);
    }
    // if (!shippingAdress) {
    //     navigate('/shipping')
    // }
    return (
        <div className="container">
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={handleSubmit}>
                <div>

                    <Radio
                        value="PayPal"
                        checked={paymentMethod === "PayPal"}
                        color="primary"
                        onClick={handlePaymentMethod}
                    />
                    <span>PayPal</span>
                </div>
                <div>

                    <Radio

                        value="SSL"
                        checked={paymentMethod === "SSL"}
                        color="primary"
                        onChange={handlePaymentMethod}
                    />
                    <span>SSLCOMMERZ</span>
                </div>
                <Button type="submit" variant='primary'>Continue</Button>
            </Form>


        </div>
    );
};

export default PaymentScreen;