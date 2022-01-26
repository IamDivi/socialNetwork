import { connect } from "react-redux"
import { compose } from "redux"
import { reset } from "redux-form"
import { addMessageAC } from "../../dialogs-reducer.ts"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import Dialogs from "./Dialogs"
import { appStateType } from "../../redux-store"
import { dialogType, messageType } from "../../dialogs-reducer"

type mapStatePropsType = {
    dialog: Array<dialogType>
    message: Array<messageType>
    newMessageText: string
}

const mapStateToProps = (state: appStateType):mapStatePropsType => {
    return {
        dialog: state.dialogState.dialogsData,
        message: state.dialogState.messageData,
        newMessageText: state.dialogState.newMessageText,
        
    }
}
type mapDispatchPropsType = {
    addMessage:(newMessageText:string) => void
}
const mapDispatchToProps = (dispatch):mapDispatchPropsType => {
    return {
        
    addMessage: (newMessageText:string) => {
        dispatch(addMessageAC(newMessageText))
        dispatch(reset('dialogAddMessageForm'))
    }
}
}




export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs)