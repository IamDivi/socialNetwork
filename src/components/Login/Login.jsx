import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { createField, Input } from "../common/formControls/FormControls";
import {login} from "../../auth-reducer.tsx"
import { Redirect } from "react-router";
import styles from "../common/formControls/FormControls.module.css"

const maxLength25 = maxLengthCreator(25)
const LoginForm = ({captchaUrl, error, handleSubmit }) => {
  
    return <form onSubmit={handleSubmit} >
       
            {createField("Email", "email", [required], Input)}
        {createField("Password", "password", [required], Input, {type: "password"})}
        {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me")}
        
        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && createField("Symbol from image", "captcha", [required], Input, {})}
       {error && <div className={styles.form_summary_error} >
            {error}
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
       <h1>Login</h1>
       <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)