import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

const orderBurgerSuccess = (id,orderData) =>{
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS,
        id: id,
        orderData : orderData
    }
}
export const orderBurgerLoading = () =>{
    return {
        type : actionTypes.ORDER_BURGER_LOADING
    }
}

export const orderBurgerFailed = (error) =>{
    return {
        type :actionTypes.ORDER_BURGER_FAILED,
        error : error
    }
}

export const purchaseInit = () =>{
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const orderBurgerStart = (orderData,token) =>{
    return dispatch => {
        axios.post('/orders.json?auth=' + token,orderData)
        .then(response => {
            console.log(response.data)
            dispatch(orderBurgerSuccess(response.data.name,orderData))
            
        })
        .catch(err =>{ 
            dispatch(orderBurgerFailed(err))
        })
    }
}
export const fetchOrdersStart = () =>{
    return {
        type : actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrdersFail = error =>{
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error
    }
}
export const fetchOrdersSuccess = (orders) =>{
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    }
}
export const fetchOrders = (token,userId) =>{
    return dispatch =>{
        dispatch(fetchOrdersStart())
        let fetchedOrders = []
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams)
        .then(response=>{
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id : key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchOrdersFail(err))
        })
    }
}