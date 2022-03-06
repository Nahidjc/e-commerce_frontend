import { useEffect } from "react";
import emptyImage from './EmptyCart.png';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import "./CartPage.css";
import CartItemCard from "./CartItemCard";
export default function CartPage() {
    let location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const productId = params.id;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log("Cart", qty);
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    cart.itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    // const removeFromCartHandler = (id) => {
    //     dispatch(removeFromCart(id))
    // }
    const checkoutHandler = () => {

        history('/login?redirect=/shipping')



    }
    console.log(cart);
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])



    return (
        <>
            {cartItems.length === 0 ?
                <div className="container-div">
                    <div>
                        <img src={emptyImage} alt="Empty_Image" />
                        <div className="text-center">
                            <Link to='/'><button

                                className="Item-action-button continue-shopping"
                            >
                                Continue Shopping
                            </button></Link>


                        </div>
                    </div>
                </div> :
                <section className="Cart-container">

                    <div className="Cart-products">
                        <div className="Cart-products-title">
                            <span>My Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span>Total:  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                        </div>
                        <div className="Cart-items-container">
                            {cartItems.length === 0 ? <h3>Cart Empty</h3> : ""}
                            {cartItems.map((item) => (
                                <CartItemCard id={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className="Cart-checkout">
                        <div className="Price-container">
                            <div className="Price-header">
                                PRICE DETAILS ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                            </div>
                            <div className="Price-breakup-container">
                                <div className="Price-breakup-row">
                                    <span className="Price-title">Total Price</span>
                                    <span className="Price-value">

                                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="Price-breakup-row">
                                    <span className="Price-title">Discount on Price</span>
                                    <span className="Price-value color-green">
                                        &nbsp;
                                        <i className="color-green"></i>
                                        ${0}%
                                    </span>
                                </div>
                                <div className="Price-breakup-row">
                                    <span className="Price-title">Delivery Charges</span>
                                    {cart.shippingPrice ? <span>${cart.shippingPrice}</span> :
                                        <span className="Price-value color-green">FREE</span>}

                                </div>
                                <div className="Price-total-row">
                                    <span className="Total-header">Total Amount</span>
                                    <span className="Total-value">

                                        ${cart.totalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="Button-container">
                            <button className="Checkout-button" onClick={checkoutHandler}>Place Order</button>
                        </div>
                    </div>
                </section>
            }

        </>
    );
}
