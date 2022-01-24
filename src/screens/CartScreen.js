import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';

const CartScreen = () => {
    let location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    // const history = useNavigate();
    const productId = params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log("Cart", qty);
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems);
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    return (
        <div>
            cart

        </div>
    );
};

export default CartScreen;