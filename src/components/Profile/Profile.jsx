import React, { useState } from "react"
import Preloader from "../common/Preloader/Preloader"
import MyPostsContainer from "./MyPostsContainer"
import style from "./Profile.module.css"
import ProfileDataFormReduxForm from "./ProfileDataForm"
import ProfileHeader from "./ProfileHeader/ProfileHeader"

const Profile = ({ profile, ...props }) => {
  const [editMode, setEditMode] = useState(false)
  if (!profile) {
    return <Preloader />
  }
  const onSubmit = (formData) => {
    props.saveProfile(formData)
    .then(() => {setEditMode(false)})
    
  }
  return <div className={style.app_content}>
    <ProfileHeader profile={profile} status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} savePhoto={props.savePhoto} />
    <div className={style.info_wrapper}>
      {editMode
        ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
        : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={props.isOwner} />}
      <div>Foto</div>
      <div>Friends</div>
    </div>
    <MyPostsContainer store={props.store} />
  </div>

}

const Contact = ({ contactTitle, contactValue }) => {
  return <div><b>{contactTitle}</b>: {contactValue}</div>
}
const ProfileData = ({ profile, isOwner, goToEditMode }) => {

  return <div>
    {isOwner && <div><button onClick={goToEditMode} >Edit</button></div>}
    <div>
      <b>Looking for a job</b>: {profile.aboutMe}
    </div>
    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? "Yes" : "No"}
    </div>
    {profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>}
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>

}

export default Profile