import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Message from '../components/Message';
const CartScreen = () => {
    let location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    // const history = useNavigate();
    const productId = params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log("Cart", qty);
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems);
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Youu cart is empty <Link to='/'>Go Back</Link>

                    </Message>
                ) : (
                    <ListGroup>
                        {cartItems.map(item => (
                            <ListGroupItem.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ca
                                    </Col>
                                </Row>

                            </ListGroupItem.Item>
                        ))}
                    </ListGroup>
                )

                }
            </Col>


        </Row>
    );
};

export default CartScreen;