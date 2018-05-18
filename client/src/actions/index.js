import axios from 'axios'
import { browserHistory } from 'react-router'
import { 
    AUTH_USER,
    UNAUTH_USER, 
    AUTH_ERROR,
    FETCH_MESSAGE } from './types'

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }){
    /*Instead of an object, this function get 
    direct access to the dispatch method */
    return function(dispatch) {
        //Submit email/passowrd to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                /* if request is good
                - Update state to indicate user is authenticated */
                dispatch({ type: AUTH_USER })
                
                //- Save the JWT Token - in localStorage (browser session)
                //localStorage.getItem('token') - to check token in Broswer session
                localStorage.setItem('token', response.data.token)

                //- Redirect to the route '/feature' 
                browserHistory.push('/feature')
            })
            .catch(() => {
                /*if request is bad...
                - Show an erro to the user */
                dispatch(authError('Bad Login Info'))
            })
        /* a THUNk is a subroutine used to inject an additional
        calculation into another subroutine. Thunks are primarily
        used to delay a calculation until its result is needed,
        or to insert operations at the beginning or end of the
        other subroutine.*/

    }
}

export function signupUser({ email, password }){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER })
                localStorage.setItem('token', response.data.token)
                browserHistory.push('/feature')
            })
            .catch(({response}) => dispatch(authError(response.data.error)))
    }
}

export function authError(error){
    return {
        type:AUTH_ERROR,
        payload: error
    }

}

export function signoutUser() {
    //to remove the token from local storage.
    localStorage.removeItem('token')
    return { type: UNAUTH_USER }
}

export function fetchMessage() {
    return function(dispatch){
        axios.get(ROOT_URL,{
            headers: { authorization: localStorage.getItem('token') } 
            })
            .then(response => {
                dispatch ({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            }
        )

    }
}