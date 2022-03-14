import React, { useState } from 'react';
import { useEffect } from 'react'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import OrderCalculation from '../components/Order/OrderCalculation';
import { Bars } from 'react-loader-spinner';
import Loader from '../components/Loader';
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
    let params = useParams();
    const orderId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const [sdkReady, setSdkReady] = useState(false)

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AXCZYiAA42dFzdLefmlCENuovXEgcxZnXD8LzgGbOORiClhXxyvlJTfJbeHSUFPJ_kdJdE9mN3CYRVpM'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

        if (!order || successPay || order._id !== Number(orderId)) {
            dispatch({ type: ORDER_PAY_RESET })

            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, order, orderId, successPay])

    const successPaymentHandler = (paymentResult) => {
        console.log('paymentResult', paymentResult);
        dispatch(payOrder(orderId, paymentResult))
    }

    return loading ? (
        <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div className='container'>
            <h1>Order: #{order._id}</h1>
            <Row>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address},  {order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {Date(`${order.paidAt}`)} </Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={`http://127.0.0.1:8000${item.image}`} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link style={{ textDecoration: 'none', 'color': 'black' }} to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={6}>
                    <OrderCalculation order={order} />
                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader />}

                            {!sdkReady ? (
                                <Loader />
                            ) : (
                                <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHandler}
                                />
                            )}
                        </ListGroup.Item>
                    )}
                </Col>
            </Row>
        </div>
    )
};

export default OrderScreen;