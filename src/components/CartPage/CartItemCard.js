
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import "./CartItemCard.css";

export default function CartItemCard({ item }) {

    const dispatch = useDispatch()
    const discountPrice = item.price * 0.10;
    const previousPrice = Number(item.price) + Number(discountPrice);

    const addItemQty = () => {
        const itemQty = item.qty + 1;
        if (item.countInStock >= itemQty) {
            dispatch(addToCart(item.product, itemQty))
        }
    }
    const removeItemQty = () => {
        const itemQty = item.qty - 1;
        dispatch(addToCart(item.product, itemQty))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    return (
        <div className="Item-container">
            <div className="Item-details">
                <img className="Item-image" src={`http://127.0.0.1:8000${item.image}`} alt="" />
                <div className="Item-desc">
                    <div className="Item-details-main">
                        <div className="Item-name-container">
                            <div className="Item-brand">Apple</div>
                            <div className="Item-name">{item.name.slice(0, 50)}</div>
                        </div>
                        <div className="Item-price">
                            <div>
                                {/* <i className="fas fa-rupee-sign icon-rupee"></i> */}
                                ${item.price}
                            </div>
                            <div>
                                <span className="orignal-price">
                                    ${previousPrice}
                                </span>
                                <span className="discount-percent">10%</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="Item-action-buttons">
                                <button
                                    onClick={() => removeFromCartHandler(item.product)}
                                    className="Item-action-button button-remove"
                                >
                                    Remove
                                </button>
                                <button
                                    // onClick={handleWishlistAction}
                                    className="Item-action-button button-wishlist"
                                >
                                    {"Move to Wishlist"}
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="input-group mt-3 mb-5">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary font-weight-bold" disabled={item.qty === 1} onClick={() => removeItemQty(item.product)}> -- </button>
                                </div>
                                <input type="text" readOnly class="form-control text-center" value={item.qty} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary font-weight-bold" onClick={() => addItemQty(item.product)}>+</button>
                                </div>
                            </div>
                            <h5 className="text-muted font-weight-bold mt-3 float-right">${(item.price * item.qty).toFixed(2)}</h5>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
