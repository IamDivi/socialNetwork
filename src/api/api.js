import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "9c3d707a-b09b-47a0-a778-ebe4cb879bcc"
    }
})
export const usersAPI = {
    getUsers: (currentPage, pageSize) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    following: (userId) => {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unFollowing: (userId) => {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },

}
export const profileAPI = {
    getProfile: (userId) => {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus: (userId) => {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus: (status) => {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto: (photoFile) => {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile: (profile) => {
        return instance.put(`profile`, profile)
    }
}

export const auth = {
    me: () => {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login: (email, password, rememberMe = false, captcha=null) => {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout: () => {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}
export const securityApi = {
    getCaptchaURL: () => {
        return instance.get(`security/get-captcha-url`)
            
    }
}