import React from "react"
import { Field, reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../utils/validators/validators"
import { Input } from "../common/formControls/FormControls"
import style from "./MyPosts.module.css"
import Post from "./Post"


const maxLength30 = maxLengthCreator(30)

const MyPosts = React.memo(props => {

    const post = props.posts.map(p => <Post message={p.message} />)
    const addNewPost = (values) => {
        props.addPost(values.newPostText)
        
        

    }

    return <div className={style.posts_wrapper}>
        <div>
            <AddPostFormRedux onSubmit={addNewPost} />
        </div>
        {post}
    </div>
})
const AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Input} name='newPostText' placeholder="What you mean?" validate={[required, maxLength30]} className={style.post_input} />
        <button>Post</button>
    </form>
}
const AddPostFormRedux = reduxForm({ form: 'dialogAddPostForm' })(AddPostForm)
export default MyPosts