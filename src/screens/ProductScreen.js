import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import { Bars } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
const ProductScreen = ({ match }) => {
    let params = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails
    console.log(product);
    const [qty, setQty] = useState(1)
    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [])
    const addToCartHandler = () => {
        console.log('Add to Cart id is: ', params.id);
        history(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'><i className="fas fa-angle-double-left"></i> Go Back</Link>
            {loading ?
                <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (<Row>
                        <Col md={6}>
                            <Image src={`http://127.0.0.1:8000${product.image}`} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating key={product._id} value={product.rating} text={`${product.numReviews} reviews`} color={"#f78205"} />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>


                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className="my-1">
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))
                                                        }

                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <div className='d-flex justify-content-center'>
                                            <Button className='btn-block' onClick={addToCartHandler} disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                                        </div>

                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>)
            }
        </div>
    );
};

export default ProductScreen;