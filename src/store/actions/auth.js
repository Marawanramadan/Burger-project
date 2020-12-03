import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () =>{
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken,localId) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken : idToken,
        localId : localId
    }
}

export const authFail =(error) =>{
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}
export const authLogout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

export const logout = (expirationTime)=>{

    return dispatch => {
        setTimeout( () =>{
            dispatch(authLogout())
        },expirationTime * 1000)
}}
export const auth = (email,password ,isSignup) =>{
    return dispatch =>{
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCm-RPhTXhY7UAe69cyAjCUJFNq5kLDw6c'
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCm-RPhTXhY7UAe69cyAjCUJFNq5kLDw6c'
        }
        axios.post(url,authData)
        .then(response =>{
            console.log(response)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem("token",response.data.idToken)
            localStorage.setItem("expirationDate",expirationDate)
            localStorage.setItem("userId",response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(logout(response.data.expiresIn))

        })
        .catch(err =>{
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const authCheckStatus = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(authLogout())
        }else{
            const expirationDate = new Date(localStorage.getItem("expirationDate"))
            const userId = localStorage.getItem("userId")
            if(expirationDate > new Date()){
                dispatch(authSuccess(token,userId))
                dispatch(logout((expirationDate.getTime() - new Date().getTime())/1000))
            }else{
                dispatch(authLogout())
            }
        }
    }
}