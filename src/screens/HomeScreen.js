import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import { Bars } from 'react-loader-spinner'
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ProductCarosel from '../components/ProductCarosel';
import FilterCategory from '../components/FilterCategory';
import FeaturedProducts from '../components/FeatureProduct/FeaturedProducts';
import Searchbar from './SearchBar/SearchBar';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    return (
        <div>
            <Searchbar />
            <div className="container">

                <div className="row ">
                    <div className="col-md-3">
                        <FilterCategory />
                    </div>
                    <div className="col-md-9">
                        <ProductCarosel />
                    </div>
                </div>
            </div>

            {loading ? <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
                : error ? <Message variant='danger'>{error}</Message>
                    : <>
                        <FeaturedProducts featured={products} />
                        <div className="mb-5 container">


                            <div className='row'>

                                <div className='col-md-12'>
                                    <div className="row ">
                                        {
                                            products.map(product => (

                                                <Product key={product._id} product={product}></Product>

                                            ))
                                        }
                                    </div>



                                </div>

                            </div>
                        </div>


                    </>



            }

        </div>
    );
};

export default HomeScreen;