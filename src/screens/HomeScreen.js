import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import { Bars } from 'react-loader-spinner'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ProductCarosel from '../components/ProductCarosel';
import FilterCategory from '../components/FilterCategory';
import Searchbar from './SearchBar/SearchBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList
    const [Page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        console.log(value);
        setPage(value);
        dispatch(listProducts({ "searchValue": '', 'page': value }))

    };

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    return (
        <div>
            <Searchbar />
            <div className="container">

                <div className="row mt-2">
                    <div className="col-md-3 p-3">
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

                        <div className="mb-5 container">
                            {/* <FeaturedProducts featured={products} /> */}

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
            <div className="container">
                <div className="d-flex justify-content-center">
                    <Stack spacing={2}>
                        <Pagination onChange={handlePageChange} count={pages} color="primary" />
                    </Stack>
                </div>
            </div>

        </div>
    );
};

export default HomeScreen;