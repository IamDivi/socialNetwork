import * as axios from 'axios'
import React from 'react'
import { getUsers } from '../../api/api'
import Preloader from '../common/Preloader/Preloader'
import Users from './Users'


class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)

            })
        
    }
    onPageChanged = (pageNumber) =>{
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        getUsers(pageNumber, this.props.pageSize)
        .then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
    }
    render() {
        
        return <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users 
        totalCount = {this.props.totalCount}
        pageSize = {this.props.pageSize}
        currentPage = {this.props.currentPage}
        onPageChanged = {this.onPageChanged}
        users = {this.props.users}
        unFollow = {this.props.unFollow}
        follow = {this.props.follow}
        followingInProgress = {this.props.followingInProgress}
        toggleFollowingProgress = {this.props.toggleFollowingProgress}
        />
        </>
       
    }
}

export default UsersAPIComponent