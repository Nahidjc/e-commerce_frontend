import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
const HomeScreen = () => {
    const [products, setProduts] = useState([])

    useEffect(() => {
        async function fetchProducts() {

            const { data } = await axios.get('/api/products')
            console.log(data);
            setProduts(data)

        }
        fetchProducts();

    }, [])
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {
                    products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <Product key={product._id} product={product}></Product>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
};

export default HomeScreen;