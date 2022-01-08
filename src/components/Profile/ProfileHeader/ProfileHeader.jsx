
import Preloader from "../../common/Preloader/Preloader"
import style from "./ProfileHeader.module.css"
import ProfileStatusWihtHook from "./ProfileStatusWithHook"

const ProfileHeader = (props) => {

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
    return <div className={style.ava_wrapper}>
    <div>
      <img src="https://i.pinimg.com/originals/5e/c0/e7/5ec0e74765d3da72cf78e0ed3c9b6cfa.jpg" className={style.wall}></img>
    </div>
    <div className={style.profile}>
    <div className={style.avatar}>
    {props.isOwner && <input type={"file"} id="file" onChange={onMainPhotoSelected} />}
     <label htmlFor="file"><img className={style.avatar_img} src={props.profile.photos.large != null ? props.profile.photos.large  :"https://seeding.com.ua/wp-content/uploads/2017/04/%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B0-%D0%B4%D0%BB%D1%8F-%D0%BE%D1%82%D0%B7%D1%8B%D0%B2%D0%BE%D0%B2.jpg"}></img>
     </label> 
    </div>
    <div className={style.status}>
      <div className={style.fullName} >{props.profile.fullName}</div>
      <ProfileStatusWihtHook status={props.status} updateStatus = {props.updateStatus}/>
    </div>
    </div>
    </div>



}
export default ProfileHeader