import React from "react"
import { reduxForm } from "redux-form"
import { createField, Input, Textarea } from "../common/formControls/FormControls"
import style from "./Profile.module.css"
import styles from "../common/formControls/FormControls.module.css"
const ProfileDataForm = ({handleSubmit, profile, error}) => {
 
    return <form onSubmit={handleSubmit}>
    <div><button>Save</button></div>
    <div>
    {error && <div className={styles.form_summary_error} >
            {error}
        </div>}
    <div>
          <b>About Me</b>: {createField("About You", "aboutMe", [], Textarea )}
        </div> 
        <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, {type:"checkbox"})}
        </div>
        <div>
          <b>My professional skills</b>: {createField("Yourprofessional skills?", "lookingForAJobDescription", [], Textarea )}
        </div> 
        <div>
          <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
           return <div key={key} className={style.contact}>
               <b>{key}: {createField(key, "contacts."+key, [], Input )}</b>
           </div>
          })}
        </div>
  </form>
        
  }
const ProfileDataFormReduxForm = reduxForm({form:"edit-profile"})(ProfileDataForm)
export default ProfileDataFormReduxForm