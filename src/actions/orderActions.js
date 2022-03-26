import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    MY_ORDER_RESET,
    TOTAL_ORDER_REQUEST,
    TOTAL_ORDER_SUCCESS,
    TOTAL_ORDER_FAIL,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL
} from "../constants/orderConstants";




export const createOrder = (order) => async (dispatch, getState) => {


    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `https://nihashopbd.pythonanywhere.com/api/orders/add/`,
            order,
            config
        )
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })
        localStorage.removeItem('cartItems')


    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}




export const getOrderDetails = (id) => async (dispatch, getState) => {


    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `https://nihashopbd.pythonanywhere.com/api/orders/${id}/`,
            config
        )
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}






export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `https://nihashopbd.pythonanywhere.com/api/orders/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ORDER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `https://nihashopbd.pythonanywhere.com/api/orders/my/orders/`,
            config
        )

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const getTotalOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: TOTAL_ORDER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `https://nihashopbd.pythonanywhere.com/api/orders/total/orders/`,
            config
        )

        dispatch({
            type: TOTAL_ORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TOTAL_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const getOrderUpdate = (order) => async (dispatch, getState) => {


    try {
        dispatch({
            type: ORDER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `https://nihashopbd.pythonanywhere.com/api/orders/update/${order._id}/`,
            order,
            config
        )
        dispatch({
            type: ORDER_UPDATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}
