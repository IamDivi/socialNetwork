import { stopSubmit } from "redux-form"
import { profileAPI } from "./api/api"

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO = "SAVE_PHOTO"

type postType = {
    id: number
    message: string
}
type contactsType = {
    github:string
    vk:string
    facebook:string
    instagram:string
    twitter:string
    website:string
    youtube:string
    mainLink:string
}
type profileType = {
    userId: number
    lookingForAJob:boolean
    lookingForAJobDescription: string
    fullName:string,
    contacts: contactsType
    
}
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

export const addPostAC = (newPostText:string) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSaccess = (photos) => ({type: SAVE_PHOTO, photos})
export const getUserProfile = (userId) =>  async (dispatch) => {
       const data = await profileAPI.getProfile(userId)
                dispatch(setUserProfile(data))
}
export const getUserStatus = (userId) => async (dispatch) => {
       const response = await profileAPI.getStatus(userId)
            dispatch(setUserStatus(response.data))
}
export const updateStatus = (status) => async (dispatch) => {

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
export const saveProfile = (profile) => async (dispatch, getState) => {
    
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
          if(response.data.resultCode === 0){
          dispatch(getUserProfile(userId))}
          else {dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))
        return Promise.reject(response.data.messages[0]) 
    }
}
export default profileReducer