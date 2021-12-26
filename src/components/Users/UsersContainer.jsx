import React from "react"
import { connect } from "react-redux"
import { follow, setCurrentPage, unFollow, toggleFollowingProgress, requestUsers} from "../../users-reducer"
import { getUsers, getPageSize, getTotalCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersSuperSelector, getPortionSize } from "../../users-selectors"
import Preloader from '../common/Preloader/Preloader'
import Users from './Users'


class UsersContainer extends React.Component {
    componentDidMount() {
       this.props.requestUsers(this.props.currentPage, this.props.pageSize)
        
    }
    onPageChanged = (pageNumber) =>{
        this.props.setCurrentPage(pageNumber)
        this.props.requestUsers(pageNumber, this.props.pageSize)
       
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
        portionSize = {this.props.portionSize}
        />
        </>
       
    }

}
const mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}
export default connect(mapStateToProps, 
    {follow, unFollow, setCurrentPage, toggleFollowingProgress,
        requestUsers})(UsersContainer)
