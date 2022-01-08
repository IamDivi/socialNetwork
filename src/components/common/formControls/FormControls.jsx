import React from "react";
import { Field } from "redux-form";
import styles from './FormControls.module.css'

const FormControl = ({input, meta:{touched, error}, children, ...props}) => {
    const someError = touched && error
    return <div className={styles.formControl + " " + (someError ? styles.error : "")}  >
        <div>
        {children}
        </div>
        {someError && <span>{error}</span>}
    </div>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}>
    <input {...input} {...restProps} />
</FormControl>
}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
return <FormControl {...props}>
    <textarea {...input} {...restProps} />
</FormControl>
}
export const createField = (placeholder, name, validators, component, props ={}, text ="") => (
    <div>
        <Field placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
        /> {text}
    </div>
)