import { userType } from "../types/types"

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeEnumForCaptcha {
    CaptchaIsRequired = 10
}
export type MeResponseType = {
    data: {id:number, email: string, login: string},
    resultCode: ResultCodeEnum,
    messages: Array<string>
}
export type LoginResponseType = {
    data: {userId:number},
    resultCode: ResultCodeEnum | ResultCodeEnumForCaptcha,
    messages: Array<string>
}

export type UsersResponseType = {
    items: Array<userType>,
    totalCount: number,
    error: string | null
}

export type DefaultResponseType = {
    data: {},
    resultCode: ResultCodeEnum,
    messages: Array<string>
}