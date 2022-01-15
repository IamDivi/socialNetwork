import { connect } from "react-redux"
import { reset } from "redux-form"
import { addPostAC } from "../../profile-reducer.ts"
import MyPosts from "./MyPosts"


const mapStateToProps = (state) => {
    return {
        newPostText: state.profileState.newPostText,
        posts: state.profileState.postData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        
        addPost: (newPostText) => {
            dispatch(addPostAC(newPostText))
            dispatch(reset('dialogAddPostForm'))
        }

    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer