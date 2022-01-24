import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import { Bars } from 'react-loader-spinner'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {
                            products.map(product => (
                                <Col sm={12} md={6} lg={4} xl={3}>
                                    <Product key={product._id} product={product}></Product>
                                </Col>
                            ))
                        }
                    </Row>
            }

        </div>
    );
};

export default HomeScreen;