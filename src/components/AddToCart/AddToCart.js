import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import AmountButtons from './AmountButtons'
import { addToCart } from '../../actions/cartActions'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'

const AddToCart = ({ item }) => {
    let params = useParams();
    const { _id, countInStock } = item
    const history = useNavigate();
    const [amount, setAmount] = useState(1)
    const addToCartHandler = () => {
        console.log('Add to Cart id is: ', params.id);
        history(`/cart/${params.id}?qty=${amount}`)
    }
    const dispatch = useDispatch()

    const increase = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount + 1
            if (tempAmount > countInStock) {
                tempAmount = countInStock
            }
            return tempAmount
        })
    }
    const decrease = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount - 1
            if (tempAmount < 1) {
                tempAmount = 1
            }
            return tempAmount
        })
    }


    return (
        <Wrapper>

            <div className='btn-container'>
                <AmountButtons
                    increase={increase}
                    decrease={decrease}
                    amount={amount}
                />



                <Link
                    disabled={item.countInStock === 0}
                    to={`/cart/${params.id}?qty=${amount}`}
                    className='btn'

                >
                    add to cart
                </Link>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart