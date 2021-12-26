import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Input } from "../common/formControls/FormControls";
import {login} from "../../auth-reducer"
import { Redirect } from "react-router";
import styles from "../common/formControls/FormControls.module.css"

const maxLength25 = maxLengthCreator(25)
const LoginForm = (props) => {
  
    return <form onSubmit={props.handleSubmit} >
        <div>
            <Field type="text" placeholder={"email"} name={'email'} component={Input} validate={[required, maxLength25]} />
        </div>
        <div>
            <Field type="text" placeholder={"Password"} name="password" component={Input} validate={[required, maxLength25]} />
        </div>
        <div>
            <Field type="checkbox" component={'input'} name='rememberMe' /> Remember me
        </div>
       {props.error && <div className={styles.form_summary_error} >
            {props.error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm({
    form:"login"
})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData) =>{
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
       <h1>Login</h1>
       <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)