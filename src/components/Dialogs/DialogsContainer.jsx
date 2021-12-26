import { connect } from "react-redux"
import { compose } from "redux"
import { reset } from "redux-form"
import { addMessageAC } from "../../dialogs-reducer"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import Dialogs from "./Dialogs"


const mapStateToProps = (state) => {
    return {
        dialog: state.dialogState.dialogsData,
        message: state.dialogState.messageData,
        newMessageText: state.dialogState.newMessageText,
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        
    addMessage: (newMessageText) => {
        dispatch(addMessageAC(newMessageText))
        dispatch(reset('dialogAddMessageForm'))
    }
}
}




export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs)