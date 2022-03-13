import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../../actions/productActions'
import PageHero from './PageHero'
import ProductImages from './ProductImages'
import Stars from './Stars'
import AddToCart from '../AddToCart/AddToCart'
const SingleProductPage = () => {
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
        <div className="container">

            <Wrapper>
                <div className=' section-center page'>
                    <Link to='/' className='btn'>
                        back to products
                    </Link>
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
                                    {product.countInStock > 0 && <AddToCart item={product} />}
                                </section>
                            </div>

                        </div>


                    </div>
                </div>

            </Wrapper>

        </div>

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