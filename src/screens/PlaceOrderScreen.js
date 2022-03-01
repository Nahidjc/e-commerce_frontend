import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { savePaymentMethod, saveShippingAddress } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
const PlaceOrderScreen = () => {
    let location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderCreate = useSelector(state => state.orderCreate)
    const { error, success, loading, order } = orderCreate
    const cart = useSelector(state => state.cart)
    cart.itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, navigate])

    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    const placeOrder = () => {
        const order = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }
        console.log(order);
        dispatch(
            createOrder(
                order
            )
        )
    }
    return (

        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            {loading ? <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div> : <Row>
                <Col md={8}>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address},
                            {cart.shippingAddress.city},
                            {"'"}
                            {cart.shippingAddress.postalcode}
                            {"'"},
                            {cart.shippingAddress.country},
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}

                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='flush'>Your Cart is empty</Message> :

                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={`http://127.0.0.1:8000${item.image}`} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} X ${item.price} = $ {(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                        }

                    </ListGroup.Item>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summery</h2>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${cart.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            }
        </div>
    );
};

export default PlaceOrderScreen;