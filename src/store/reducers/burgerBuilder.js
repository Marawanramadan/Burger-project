import * as actionTypes from '../actions/actionTypes'
const initialState = {
    ingredients :null,
    totalPrice : 4,
    error : false
}

const PRICEADDITION = {
    meat : 1.5,
    salad : 0.5,
    bacon : 1,
    cheese : 0.7
}
// const ingredientPrice = PRICEADDITION[type]
//         const oldPrice = this.state.totalPrice
//         const updatedPrice = oldPrice + ingredientPrice
const reducer = (state = initialState ,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                totalPrice : state.totalPrice +PRICEADDITION[action.ingredientName],
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                totalPrice : state.totalPrice - PRICEADDITION[action.ingredientName],
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                }
                }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error:false,
                totalPrice:4
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error :true
            }
        default:
            return state
    }
}

export default reducer;