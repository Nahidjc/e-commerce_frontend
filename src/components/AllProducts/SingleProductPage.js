import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductReview, listProductDetails, listProducts } from '../../actions/productActions'
import Stars from './Stars'
import AddToCart from '../AddToCart/AddToCart'
import Review from '../Review/Review'
import { Paper } from '@mui/material'

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Message from '../Message'
import { Bars } from 'react-loader-spinner'
import { PRODUCT_REVIEW_RESET } from '../../constants/productConstants'
import { Typography } from '@material-ui/core'
import Product from '../Product'
const SingleProductPage = () => {
  let params = useParams();
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(2)
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product, productDetailsSuccess } = productDetails
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin
  const reviewProduct = useSelector(state => state.reviewProduct);
  const { loading: reviewLoading, successReview, error: reviewError } = reviewProduct
  const productList = useSelector(state => state.productList)
  const { error: relatedProductError, loading: relatedLading, products } = productList


  useEffect(() => {
    dispatch(listProductDetails(params.id))
    if (productDetailsSuccess) {
      dispatch(listProducts({ "searchValue": product.brand, 'page': 1 }))
    }
    if (successReview) {
      setComment('')
      setRating(2)
      dispatch({ type: PRODUCT_REVIEW_RESET })
    }
  }, [dispatch, params.id, successReview, productDetailsSuccess, product.brand])






  const handleReview = () => {
    dispatch(addProductReview({ _id: product._id, rating: rating, comment: comment }))
    console.log(rating, comment);
    setComment('')
    setRating(2)
  }



  return (
    <div className="container" >

      <Wrapper>
        <div className=' section-center page'>
          <Link to='/' className='btn'>
            back to products
          </Link>
          {(reviewLoading || reviewError) &&

            <div className="mt-5 p-5">
              {reviewLoading && <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>}
              {reviewError && <Message variant='danger'>{reviewError}</Message>}
            </div>
          }


          {loading ? <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
            : error ? <Message variant='danger'>{error}</Message>
              : <>
                <Paper elevation={2} style={{ padding: '20px', margin: '20px' }}>
                  <div className='section'>
                    <div className="row">
                      <div className="col-md-6">
                        <img className='img-fluid' src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
                      </div>
                      <div className="col-md-6">

                        <section className='content'>
                          <h2>{product.name}</h2>
                          <Stars stars={Number(product.rating)} reviews={product.numReviews} />
                          <h5 className='price'>${product.price}</h5>
                          <p className='desc'>{product.description}</p>
                          <p className='info'>
                            <span>Available : </span>
                            {product.countInStock > 0 ? 'In stock' : 'out of stock'}
                          </p>
                          <p className='info'>
                            <span>Category :</span>
                            {product.category}
                          </p>
                          <p className='info'>
                            <span>Brand :</span>
                            {product.brand}
                          </p>
                          <hr />
                          {product.countInStock > 0 ? <AddToCart item={product} /> : <>

                            <Button color='danger'>Out of Stock</Button>
                          </>}

                        </section>

                      </div>

                    </div>


                  </div>

                </Paper>
                <div className="mt-2 " style={{ padding: '20px', margin: '10px' }}>
                  <Typography variant="h5" component="h2" className='my-3' style={{ color: '#EA6721' }}>RELATED PRODUCTS</Typography>
                  {relatedLading ? <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
                    : relatedProductError ? <Message variant='danger'>{relatedProductError}</Message>
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
                </div>
                {
                  product.reviews.length ? <Paper elevation={2} style={{ padding: '20px', margin: '20px' }}>
                    {product.reviews.map(review => <Review review={review}></Review>)}
                  </Paper> : <></>
                }

                {userInfo && <div className="write-review mt-5">
                  <Paper elevation={2} style={{ padding: '20px', margin: '20px' }} >
                    <h4>Write Review</h4>
                    <Rating
                      name="hover-feedback"
                      value={rating}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}

                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Form reply onSubmit={handleReview}>
                      <Form.TextArea value={comment} onChange={e => setComment(e.target.value)} />
                      <Button content='Add Review' labelPosition='left' icon='edit' primary />
                    </Form>
                  </Paper>
                </div>
                }
              </>
          }
        </div>
      </Wrapper>

    </div >

  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 1rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage