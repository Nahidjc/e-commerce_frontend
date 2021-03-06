import React from 'react'
import { FaBars } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/zim.png'
// import { logout } from '../../actions/userActions'
import CartButton from './CartButton'
// import { MY_ORDER_RESET } from '../../constants/orderConstants'

const NavbarNew = () => {
  // const cart = useSelector(state => state.cart);
  // const { cartItems } = cart;
  const userLogin = useSelector(state => state.userLogin);
  // const dispatch = useDispatch()
  const { userInfo } = userLogin
  // const logoutHandler = () => {
  //   dispatch(logout())
  //   dispatch({ 'type': MY_ORDER_RESET })
  // }
  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={logo} alt='comfy sloth' />
          </Link>
          <button type='button' className='nav-toggle' >
            <FaBars />
          </button>
        </div>


        {userInfo && userInfo.isAdmin ?
          <ul className='nav-links'>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
              <Link to='/Users'>Users</Link>
              <Link to='/admin/addproduct'>Add Product</Link>

            </li>
          </ul>
          :
          <ul className='nav-links'>
            <li>
              <Link to='/'>Home</Link>
              <Link to='/about'>About</Link>
              <Link to='/allproducts'>Products</Link>
              <Link to='/myorders'>My Order</Link>

            </li>

          </ul>
        }







        <CartButton />
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default NavbarNew;