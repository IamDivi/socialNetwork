import React from "react";
import styles from './FormControls.module.css'

export const Input = ({input, meta, ...props}) => {
    const someError = meta.touched && meta.error
    return <div className={styles.formControl + " " + (someError ? styles.error : "")}  >
        <div>
        <input {...input} {...props} />
        </div>
        {someError && <span>{meta.error}</span>}
    </div>
}