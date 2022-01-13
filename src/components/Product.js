import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
    console.log(product);
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </a>
            <Card.Body>
                <a style={{ 'textDecoration': "none" }} href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>

                    </Card.Title>
                </a>

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