import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../components/Message';
import DeleteIcon from '@mui/icons-material/Delete';
const CartScreen = () => {
    let location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const productId = params.id;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {

        history('/login?redirect=/shipping')



    }

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
                        You cart is empty <Link to='/'>Go Back</Link>

                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={`http://127.0.0.1:8000${item.image}`} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link style={{ textDecoration: 'none' }} to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                            }

                                        </Form.Control>
                                    </Col>

                                    <Col>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <DeleteIcon color="warning" />
                                        </Button>
                                    </Col>

                                </Row>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )

                }
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}

                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>

                        <div className='d-flex justify-content-center'>
                            <Button
                                type='button'
                                className='btn-block '
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}

                            >
                                Proceed To Checkout
                            </Button>
                        </div>

                    </ListGroup.Item>
                </Card>
            </Col>


        </Row>
    );
};

export default CartScreen;