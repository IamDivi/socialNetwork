import React from "react";
import { connect } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { createField, Input } from "../common/formControls/FormControls";
import {login} from "../../auth-reducer"
import { Redirect } from "react-router-dom";
import styles from "../common/formControls/FormControls.module.css"
import { appStateType } from "../../redux-store";
import { FC } from "react";

const maxLength25 = maxLengthCreator(25)
type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm: FC<InjectedFormProps<LoginFormValueTypes, LoginFormOwnProps> & LoginFormOwnProps> = ({captchaUrl, error, handleSubmit }) => {
  
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
const LoginReduxForm = reduxForm<LoginFormValueTypes, LoginFormOwnProps>({form:"login"})(LoginForm)

type mapStatePropsType = {
    captchaUrl: null | string
    isAuth: boolean
}
type mapDispatchPropsType = {
    login:(email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}
type LoginFormValueTypes = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
const Login: FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
    const onSubmit = (formData:LoginFormValueTypes) =>{
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
const mapStateToProps = (state: appStateType):mapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)