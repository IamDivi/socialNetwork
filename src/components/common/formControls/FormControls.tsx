import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldProps, WrappedFieldsProps } from "redux-form";
import styles from './FormControls.module.css'
import {FieldValidatorType} from '../../../utils/validators/validators'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
const FormControl: React.FC<FormControlPropsType> = ({ meta:{touched, error}, children}) => {
    const someError = touched && error
    return <div className={styles.formControl + " " + (someError ? styles.error : "")}  >
        <div>
        {children}
        </div>
        {someError && <span>{error}</span>}
    </div>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}
export const Textarea: React.FC<WrappedFieldProps>= (props) => {
    //const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
return <FormControl {...props}>
    <textarea {...input} {...restProps} />
</FormControl>
}
export const createField = (placeholder: string | null, 
                            name: string, 
                            validators: Array<FieldValidatorType>, 
                            component: string | React.Component | React.FC, 
                            props ={}, 
                            text:string ="") => (
    <div>
        <Field placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
        /> {text}
    </div>
)