import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
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
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    if (!shippingAdress) {
        navigate('/shipping')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            value="PayPal"

                            onChange={(e) => setPaymentMethod(e.target.value)}

                        >

                        </Form.Check>
                        <Form.Check
                            type="radio"
                            checked
                            label='SSLCOMMERZ'
                            id='sslcommerz'
                            name='paymentMethod'
                            value="SSLCOMMERZ"
                            onChange={(e) => setPaymentMethod(e.target.value)}

                        >

                        </Form.Check>
                    </Col>

                </Form.Group>
                <Button type="submit" variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;