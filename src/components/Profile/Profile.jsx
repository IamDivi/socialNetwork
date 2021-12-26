import MyPostsContainer from "./MyPostsContainer"
import style from "./Profile.module.css"
import ProfileHeader from "./ProfileHeader/ProfileHeader"

const Profile = (props) => {
  return <div className={style.app_content}>
    <ProfileHeader profile={props.profile} status={props.status} updateStatus = {props.updateStatus}/>
    <div className={style.info_wrapper}>
      <div>Contacts:
        {/* <div>{props.profile.contacts.facebook}</div>
        <div>{props.profile.contacts.vk}</div>
        <div>{props.profile.contacts.twitter}</div>
        <div>{props.profile.contacts.instagram}</div>
        <div>{props.profile.contacts.github}</div> */}
      </div>
      <div>Foto</div>
      <div>Friends</div>
    </div>
    <MyPostsContainer store={props.store} />
  </div>

}
export default Profile