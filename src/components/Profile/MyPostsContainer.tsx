import { connect } from "react-redux"
import { reset } from "redux-form"
import { addPostAC } from "../../profile-reducer.ts"
import { appStateType } from "../../redux-store"
import { postType } from "../../types/types"
import MyPosts from "./MyPosts"

type mapStatePropsType = {
    newPostText: string
    posts: Array<postType>
}

const mapStateToProps = (state:appStateType):mapStatePropsType => {
    return {
        newPostText: state.profileState.newPostText,
        posts: state.profileState.postData
    }
}
type mapDispatchPropsType = {
    addPost:(newPostText: string) => void
}
const mapDispatchToProps = (dispatch: any):mapDispatchPropsType => {
    return {
        
        addPost: (newPostText) => {
            dispatch(addPostAC(newPostText))
            dispatch(reset('dialogAddPostForm'))
        }

    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer