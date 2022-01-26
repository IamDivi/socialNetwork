
// @ts-ignore
import { getAuthUserData } from './auth-reducer.tsx'

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

export type initialStateType = {
    initialized: boolean
}
const initialState: initialStateType = {
    initialized: false,

}
type ActionType = initializedSuccessActionType
const appReducer = (state = initialState, action: ActionType):initialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state

    }

}
export type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}


export default appReducer