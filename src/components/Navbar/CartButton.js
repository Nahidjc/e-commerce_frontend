import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../actions/userActions";
import { MY_ORDER_RESET } from "../../constants/orderConstants";

const CartButton = () => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin);
  const dispatch = useDispatch()
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
    dispatch({ 'type': MY_ORDER_RESET })
    navigate('/')
  }
  return (
    <Wrapper className="cart-btn-wrapper">
      {userInfo && userInfo.isAdmin ? <></> :
        <Link to="/cart" className="cart-btn" >
          Cart
          <span className="cart-container">
            <FaShoppingCart />
            <span className="cart-value">{cartItems.length}</span>
          </span>
        </Link>
      }

      {userInfo ? (
        <>
          {userInfo && userInfo.isAdmin && <span>{userInfo.name}</span>}
          <button
            type="button"
            className="auth-btn"
            onClick={logoutHandler}

          >
            Logout < FaUserMinus />
          </button>
        </>


      ) : (
        <>
          <Link to="/login" className="auth-btn" >
            Login <FaUserPlus />
          </Link>

        </>

      )}
    </Wrapper >
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButton;