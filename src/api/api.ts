import { profileType } from './../types/types';
import { DefaultResponseType, LoginResponseType,  MeResponseType, UsersResponseType} from './apiTypes';
import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "9c3d707a-b09b-47a0-a778-ebe4cb879bcc"
    }
})
export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    following: (userId: number) => {
        return instance.post<DefaultResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unFollowing: (userId: number) => {
        return instance.delete<DefaultResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },

}
export const profileAPI = {
    getProfile: (userId: number) => {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus: (userId: number) => {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus: (status: string) => {
        return instance.put(`profile/status`, { status })
    },
    savePhoto: (photoFile:any) => {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile: (profile: profileType) => {
        return instance.put(`profile`, profile)
    }
}

export const auth = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string =null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete<DefaultResponseType>(`auth/login`)
            .then(response => response.data)
    }
}
export const securityApi = {
    getCaptchaURL: () => {
        return instance.get(`security/get-captcha-url`)
            
    }
}