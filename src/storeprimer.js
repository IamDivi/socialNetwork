import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SEND_MESSAGE = "SEND-MESSAGE"
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT"
const store = {
    _state: {
        dialogState: {
            dialogsData: [
                { id: 1, name: "any1" },
                { id: 2, name: "any2" },
                { id: 3, name: "any3" },
            ],
            messageData: [
                { id: 1, message: "Hi" },
                { id: 2, message: "Hi)" },
                { id: 3, message: "How are You?" }
            ],
            newMessageText: ""
        },
        profileState: {
            postData: [
                { id: 1, message: "Hi, how are you?" },
                { id: 2, message: "My first post" }
            ],
            newPostText: ""
        }
    },
    getState() {
        return this._state
    },
    rerenderEntireTree() {
    },
    subscribe(observer) {
        this.rerenderEntireTree = observer
    },
    dispatch(action) {

        this._state.profileState = profileReducer(this._state.profileState, action)
        this._state.dialogState = dialogsReducer(this._state.dialogState, action)
        this.rerenderEntireTree(this._state)
    }
}




export default store