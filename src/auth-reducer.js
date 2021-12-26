import { stopSubmit } from "redux-form"
import { auth } from "./api/api"

const SET_USER_DATA = "AUTH/SET_USER_DATA"

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
export const getAuthUserData = () => {
    return async (dispatch) => {
        const data = await auth.me()
        if (data.resultCode === 0) {
            let { id, login, email } = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}
export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        const data = await auth.login(email, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let errorMessage = data.messages.length > 0 ? data.messages[0] : "Some Error"
            dispatch(stopSubmit("login", { _error: errorMessage }))
        }
    }
}
export const logout = () => {
    return async (dispatch) => {
        const data = await auth.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}
export default authReducer