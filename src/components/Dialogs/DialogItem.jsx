import { NavLink } from 'react-router-dom'
import style from './Dialogs.module.css'


const DialogItem = (props) => {
    return <div className={style.dialog_item}>
        <NavLink to={"/dialogs/" + props.id} activeClassName={style.active}>{props.name}</NavLink>
    </div>
}
export default DialogItem