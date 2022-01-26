const SEND_MESSAGE = "SEND-MESSAGE"
export type dialogType = {
    id: number,
    name: string
}
export type messageType = {
    id:number,
    message:string
}
const initialState = {
    dialogsData: [
        { id: 1, name: "any1" },
        { id: 2, name: "any2" },
        { id: 3, name: "any3" },
    ] as Array<dialogType> ,
    messageData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Hi)" },
        { id: 3, message: "How are You?" }
    ] as Array<messageType>
}
export type initialStateType = typeof initialState
type ActionType = addMessageCreatorActionType
const dialogsReducer = (state = initialState, action: ActionType):initialStateType => {
    
    switch (action.type) {
      
            case SEND_MESSAGE: 
            let newMessage = action.newMessageText
            
            return {
                ...state,
                messageData: [...state.messageData, { id:6, message: newMessage }],
               
                
            }

        default:
            return state
    }
}
type addMessageCreatorActionType = {
    type: typeof SEND_MESSAGE,
    newMessageText: string
}
export const addMessageAC = (newMessageText:string):addMessageCreatorActionType => {
    return {
        type: SEND_MESSAGE,
        newMessageText
    }
}


export default dialogsReducer