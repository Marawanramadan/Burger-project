import * as actionTypes from '../actions/actionTypes'

const initialState = {
    idToken: null,
    localId : null,
    error : null,
    loading : false
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.idToken,
                localId : action.localId,
                loading : false,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                loading:false,
                error : action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                idToken : null,
                localId : null
            }
        default:
            return state 
    }
}

export default reducer