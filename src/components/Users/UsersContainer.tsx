import React from "react"
import { connect } from "react-redux"
import { appStateType } from "../../redux-store"
import { userType } from "../../types/types"
import { follow, setCurrentPage, unFollow, toggleFollowingProgress, requestUsers} from "../../users-reducer.ts"
import { getPageSize, getTotalCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersSuperSelector, getPortionSize } from "../../users-selectors.ts"
import Preloader from '../common/Preloader/Preloader'
import Users from './Users.tsx'

type mapStatePropsType = {
    currentPage:number
    pageSize:number
    isFetching:boolean
    totalCount:number
    users: Array<userType>
    followingInProgress:Array<number>
    portionSize:number
    
}
type mapDispatchPropsType = {
    unFollow:(userId:number) => void
    follow:(userId:number) => void
    requestUsers:(currentPage:number, pageSize:number) => void
    setCurrentPage:(pageNumber:number) => void
    toggleFollowingProgress:() => void
}
type ownPropsType = {
    pageTitle:string
}
type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType
class UsersContainer extends React.Component<propsType> {
    componentDidMount() {
       this.props.requestUsers(this.props.currentPage, this.props.pageSize)
        
    }
    onPageChanged = (pageNumber:number) =>{
        this.props.setCurrentPage(pageNumber)
        this.props.requestUsers(pageNumber, this.props.pageSize)
       
    }
    render() {
        
        return <>
        <h2>{this.props.pageTitle}</h2>
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
const mapStateToProps = (state: appStateType):mapStatePropsType => {
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
//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps,
    {follow, unFollow, setCurrentPage, toggleFollowingProgress,
        requestUsers})(UsersContainer)
