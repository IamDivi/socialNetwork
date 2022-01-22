import { usersAPI } from "./api/api"
import {updateObjectInArray} from "./utils/object-helpers"
import {userType} from "./types/types";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"


const initialState = {
    users: [] as Array<userType>,
    pageSize: 100,
    totalCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    portionSize: 10
}
type initialStateType = typeof initialState
const userReducer = (state = initialState, action):initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}
export const requestUsers = (currentPage:number, pageSize:number) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}
const followUnfollowFlow = async (dispatch, userId:number, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    const data = await apiMethod(userId)
            if (data.resultCode == 0) {
                dispatch(actionCreator(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
}
export const unFollow = (userId:number) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unFollowing.bind(usersAPI), unFollowSuccess)
    }
}
export const follow = (userId:number) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.following.bind(usersAPI), followSuccess)
    }
}
type followSuccessActionType ={type:typeof FOLLOW, userId:number}
export const followSuccess = (userId:number):followSuccessActionType => ({ type: FOLLOW, userId })
type unFollowSuccessActionType ={type:typeof UNFOLLOW, userId:number}
export const unFollowSuccess = (userId:number):unFollowSuccessActionType => ({ type: UNFOLLOW, userId })
type setUsersActionType ={type:typeof SET_USERS, users:Array<userType>}
export const setUsers = (users:Array<userType>):setUsersActionType => ({ type: SET_USERS, users })
type setCurrentPageActionType ={type:typeof SET_CURRENT_PAGE, currentPage:number}
export const setCurrentPage = (currentPage:number):setCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })
type setTotalUsersCountActionType ={type:typeof SET_TOTAL_USERS_COUNT, totalCount:number}
export const setTotalUsersCount = (totalUsersCount:number):setTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalCount: totalUsersCount })
type toggleIsFetchingActionType ={type:typeof TOGGLE_IS_FETCHING, isFetching:boolean}
export const toggleIsFetching = (isFetching:boolean):toggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
type toggleFollowingProgressActionType ={type:typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching:boolean, userId:number}
export const toggleFollowingProgress = (isFetching:boolean, userId:number):toggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export default userReducer