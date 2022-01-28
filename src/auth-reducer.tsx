import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { auth, securityApi } from "./api/api"
import { ResultCodeEnum } from "./api/apiTypes"
import { appStateType } from "./redux-store"

const SET_USER_DATA = "AUTH/SET_USER_DATA"
const GET_CAPTCHA_URL_SACCESS = "GET_CAPTCHA_URL_SACCESS"

export type initialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}
const initialState:initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}
type ActionType = setAuthUserDataActionType | getCaptchaUrlSaccessActionType
const authReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SACCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
type setAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type setAuthUserDataActionType = { type: typeof SET_USER_DATA, payload: setAuthUserDataActionPayloadType }
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType =>
    ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
type getCaptchaUrlSaccessActionType = { type: typeof GET_CAPTCHA_URL_SACCESS, payload: { captchaUrl: string | null } }
export const getCaptchaUrlSaccess = (captchaUrl: string | null): getCaptchaUrlSaccessActionType =>
    ({ type: GET_CAPTCHA_URL_SACCESS, payload: { captchaUrl } })

type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionType>
export const getAuthUserData = ():ThunkType => {
    return async (dispatch) => {
        const data = await auth.me()
        if (data.resultCode === ResultCodeEnum.Success) {
            let { id, login, email } = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null):ThunkType => {
    return async (dispatch) => {
        const data = await auth.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let errorMessage = data.messages.length > 0 ? data.messages[0] : "Some Error"
            dispatch(stopSubmit("login", { _error: errorMessage }))
        }
    }
}
export const logout = ():ThunkType => {
    return async (dispatch) => {
        const data = await auth.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}
export const getCaptchaUrl = ():ThunkType => {
    return async (dispatch) => {
        const response = await securityApi.getCaptchaURL()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSaccess(captchaUrl))
    }
}
export default authReducer