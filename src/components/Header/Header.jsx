import { NavLink } from "react-router-dom"
import style from "./Header.module.css"

const Header = (props) => {
    return <header className={style.app_header}>
    <NavLink to={"/profile"} activeClassName={style.active}>Profile</NavLink>
    <NavLink to="/friends" activeClassName={style.active}>Friends</NavLink>
    <NavLink to="/dialogs" activeClassName={style.active}>Messages</NavLink>
    <NavLink to="#">Settings</NavLink>
    {props.isAuth ? <div>{ props.login} - <button onClick={props.logout} >Log out</button></div> 
    : <NavLink to="/login" activeClassName={style.active}>Login</NavLink>}
    
  </header>
}
export default Header