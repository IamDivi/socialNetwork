import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { userType } from '../../types/types'
import style from "./Users.module.css"

type propsType = {
    user:userType
    followingInProgress:Array<number>
    unFollow:(userId:number) => void
    follow:(userId:number) => void
}

const User: FC<propsType> = ({user, ...props}) => {
    return <div className={style.user}>
        <div className={style.avatar}>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : "https://seeding.com.ua/wp-content/uploads/2017/04/%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B0-%D0%B4%D0%BB%D1%8F-%D0%BE%D1%82%D0%B7%D1%8B%D0%B2%D0%BE%D0%B2.jpg"} />
            </NavLink>
            <div>
                {user.followed
                    ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                        props.unFollow(user.id)
                    }} >unFollow</button>
                    : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                        props.follow(user.id)
                    }} >Follow</button>}
            </div>
        </div>
        <div className={style.profile} >
            <div>{user.name} </div>
            <div>{user.status}</div>
        </div>
    </div>
      
}

export default User