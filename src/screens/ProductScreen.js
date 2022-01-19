import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import { Bars } from 'react-loader-spinner';

const ProductScreen = ({ match }) => {
    let params = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'><i class="fas fa-angle-double-left"></i> Go Back</Link>
            {loading ?
                <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (<Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
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

                                    <ListGroup.Item>
                                        <div className='d-flex justify-content-center'>
                                            <Button className='btn-block ' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
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