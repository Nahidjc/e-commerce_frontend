import React from 'react';
// import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// import Rating from './Rating';

import './style.css'
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";

import { Button, Grid } from '@mui/material';
import Rating from './Rating';

// import Rating from 'react-rating';






const Product = ({ product }) => {
    const history = useNavigate();
    console.log(product);
    const addToCartHandler = () => {
        console.log('Add to Cart id is: ', product.id);
        history(`/cart/${product._id}?qty=${1}`)
    }
    return (
        // <Card className='my-3 p-3 rounded'>
        //     <Link to={`/product/${product._id}`}>
        //         <Card.Img src={`http://127.0.0.1:8000${product.image}`} />
        //     </Link>
        //     <Card.Body>
        //         <Link style={{ 'textDecoration': "none" }} to={`/product/${product._id}`}>
        //             <Card.Title as="div">
        //                 <strong>{product.name}</strong>

        //             </Card.Title>
        //         </Link>

        //         <Card.Text as='div'>
        //             <div className="my-3">
        //                 <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f78205"}></Rating>

        //             </div>

        //         </Card.Text>
        //         <Card.Text as='h3'>
        //             ${product.price}
        //         </Card.Text>
        //     </Card.Body>
        // </Card>


        <div className="my-2 col-md-6 col-sm-6 col-xs-6 col-lg-3">

            <Card sx={{ maxWidth: 260, height: 360 }}>
                <CardMedia
                    component="img"
                    height="194"
                    width='200'

                    image={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                />
                <CardContent>

                    <Link style={{ 'textDecoration': "none" }} to={`/product/${product._id}`}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>{product.name.slice(0, 50)}...</strong>
                        </Typography>
                    </Link>

                </CardContent>
                <CardActions disableSpacing>


                    <div className="my-1">

                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f78205"}></Rating>

                    </div>


                </CardActions>

                <CardActions >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div className="mb-1 text-warning">
                            ${product.price}
                        </div>
                        <div className="mb-1">
                            {product.countInStock === 0 ? <div className='text-danger'> Out Of Stock</div> :

                                <Button size="small" variant="outlined" onClick={addToCartHandler} disabled={product.countInStock === 0} type='button'>
                                    Add to Cart
                                </Button>

                            }

                        </div>
                    </Grid>

                </CardActions>
            </Card>
        </div>


    );
};

export default Product;