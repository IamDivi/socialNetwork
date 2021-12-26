import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import style from "./Users.module.css"

const Users = (props) => {
    return <div>
        <Paginator totalCount={props.totalCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            portionSize={props.portionSize} />

        {<div className={style.users}>
            {props.users.map(u => <User
                user={u}
                key={u.id}
                followingInProgress={props.followingInProgress}
                unFollow={props.unFollow}
                follow={props.follow} />)}
        </div>}
    </div>
}

export default Users