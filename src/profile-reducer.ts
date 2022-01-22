import { stopSubmit } from "redux-form"
import { profileAPI } from "./api/api"
import {photosType, postType, profileType} from "./types/types";

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO = "SAVE_PHOTO"


const initialState = {
    postData: [
        { id: 1, message: "Hi, how are you?" },
        { id: 2, message: "My first post" }
    ] as Array<postType>,
    profile: null as profileType | null,
    status: ""
}
export type initialStateType = typeof initialState
const profileReducer = (state = initialState, action):initialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postData: [...state.postData, { id: 3, message: action.newPostText }],   
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
            case SET_STATUS:
                return {
                    ...state,
                    status: action.status
                }
                case DELETE_POST:
                    return {
                        ...state,
                        postData: state.postData.filter(p=>p.id != action.postId)
                    }
                    case SAVE_PHOTO:
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos} as profileType
                }
        default:
            return state
    }
}
type addPostACType = {type: typeof ADD_POST, newPostText:string}
export const addPostAC = (newPostText:string):addPostACType => ({ type: ADD_POST, newPostText })
type setUserProfileActionType = {type: typeof SET_USER_PROFILE, profile:profileType}
export const setUserProfile = (profile):setUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
type setUserStatusACType = {type: typeof SET_STATUS, status:string}
export const setUserStatus = (status:string):setUserStatusACType => ({ type: SET_STATUS, status })
type deletePostACType = {type: typeof DELETE_POST, postId:number}
export const deletePost = (postId:number):deletePostACType => ({type: DELETE_POST, postId})
type savePhotoSaccessACType = {type: typeof SAVE_PHOTO, photos:photosType}
export const savePhotoSaccess = (photos:photosType):savePhotoSaccessACType => ({type: SAVE_PHOTO, photos})
export const getUserProfile = (userId:number) =>  async (dispatch) => {
       const data = await profileAPI.getProfile(userId)
                dispatch(setUserProfile(data))
}
export const getUserStatus = (userId:number) => async (dispatch) => {
       const response = await profileAPI.getStatus(userId)
            dispatch(setUserStatus(response.data))
}
export const updateStatus = (status:string) => async (dispatch) => {

      try{const response = await profileAPI.updateStatus(status)
            if(response.data.resultCode === 0)
            dispatch(setUserStatus(status))}
            catch(error){
                alert(error.message)
            }
}
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
          if(response.data.resultCode === 0)
          dispatch(savePhotoSaccess(response.data.data.photos))
}
export const saveProfile = (profile:photosType) => async (dispatch, getState) => {
    
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
          if(response.data.resultCode === 0){
          dispatch(getUserProfile(userId))}
          else {dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))
        return Promise.reject(response.data.messages[0]) 
    }
}
export default profileReducer