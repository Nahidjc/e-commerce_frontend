import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    console.log(product);
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>
            <Card.Body>
                <Link style={{ 'textDecoration': "none" }} to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>

                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f78205"}></Rating>

                    </div>

                </Card.Text>
                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>





        </Card>
    );
};

export default Product;