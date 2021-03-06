import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
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
    TOTAL_ORDER_RESET,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_UPDATE_RESET
} from "../constants/orderConstants";


export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,

            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}




export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}




export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}



export const getMyOrderList = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                loading: true
            }

        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case MY_ORDER_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}
export const TotalOrderList = (state = { orders: [] }, action) => {
    switch (action.type) {
        case TOTAL_ORDER_REQUEST:
            return {
                loading: true
            }

        case TOTAL_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case TOTAL_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case TOTAL_ORDER_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}



export const orderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_UPDATE_REQUEST:
            return { ...state, loading: true }
        case ORDER_UPDATE_SUCCESS:
            return { loading: false, UpdateSuccess: true, order: action.payload }
        case ORDER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}