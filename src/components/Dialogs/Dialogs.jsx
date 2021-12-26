import React from "react"
import { Field, reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../utils/validators/validators"
import { Input } from "../common/formControls/FormControls"
import DialogItem from './DialogItem'
import style from './Dialogs.module.css'
import MessageItem from './MessageItem'
const maxLength200 = maxLengthCreator(200)
const Dialogs = (props) => {
 
    const addNewMessage = (values) => {
        props.addMessage(values.newMessageText)
    }
    const dialog = props.dialog.map(el => <DialogItem id={el.id} name={el.name} />)
    const message = props.message.map(el => <MessageItem message={el.message} />)
  
    return <div className={style.dialogs}>
        <div className={style.dialog_items}>
            {dialog}
        </div>
        <div className={style.message}>
            {message}
            
            
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
        
    </div>
}
const AddMessageForm = (props) => {
    return <form className={style.send_message} onSubmit={props.handleSubmit}>
    <div>
    <Field component={Input} name='newMessageText' className={style.message_input} validate={[ required, maxLength200 ]}/>
    </div>
    <div>
    <button className={style.send_button}>Send</button>
    </div>
    </form>
}
const AddMessageFormRedux = reduxForm({form:'dialogAddMessageForm'})(AddMessageForm)
export default Dialogs