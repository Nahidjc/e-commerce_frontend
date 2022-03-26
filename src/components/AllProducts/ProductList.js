import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'

import GridView from './GridView'
const ProductList = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    if (products.length < 1) {
        return (
            <h5 style={{ textTransform: 'none' }}>
                Sorry, no products matched your search.
            </h5>
        )
    }

    // if (grid_view === false) {
    //     return <ListView products={products} />
    // }
    return <GridView products={products} />
}

export default ProductList