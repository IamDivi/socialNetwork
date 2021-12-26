import style from './Dialogs.module.css'

const MessageItem = (props) => {
    return <div className={style.message_item}>
        {props.message}
    </div>
}
export default MessageItem