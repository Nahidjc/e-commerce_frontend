import { useDispatch } from "react-redux";
import { removeFromCart } from "../../actions/cartActions";
import "./CartItemCard.css";

export default function CartItemCard({ item }) {
    console.log(item);
    const dispatch = useDispatch()
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
                            <div className="Item-name">{item.name}</div>
                        </div>
                        <div className="Item-price">
                            <div>
                                {/* <i className="fas fa-rupee-sign icon-rupee"></i> */}
                                ${item.price}
                            </div>
                            <div>
                                <span className="orignal-price">
                                    ${item.price}
                                </span>
                                <span className="discount-percent">0%</span>
                            </div>
                        </div>
                    </div>
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
            </div>
        </div>
    );
}
