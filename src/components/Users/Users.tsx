import React from 'react'
import { FC } from 'react'
import { userType } from '../../types/types'
//@ts-ignore
import Paginator from '../common/Paginator/Paginator.tsx'
import User from './User.tsx'

import style from "./Users.module.css"

type propsType = {
    totalCount:number
    pageSize:number
    currentPage:number
    onPageChanged:() => void
    portionSize:number
    users: Array<userType>
    followingInProgress:Array<number>
    unFollow:(userId:number) => void
    follow:(userId:number) => void
}

const Users: FC<propsType> = ({totalCount, pageSize, currentPage, onPageChanged, portionSize, users, ...props}) => {
    return <div>
        <Paginator totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            portionSize={portionSize} />

        {<div className={style.users}>
            {users.map(u => <User
                user={u}
                key={u.id}
                followingInProgress={props.followingInProgress}
                unFollow={props.unFollow}
                follow={props.follow} />)}
        </div>}
    </div>
}

export default Users