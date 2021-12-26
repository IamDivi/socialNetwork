const SEND_MESSAGE = "SEND-MESSAGE"
const initialState = {
    dialogsData: [
        { id: 1, name: "any1" },
        { id: 2, name: "any2" },
        { id: 3, name: "any3" },
    ],
    messageData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Hi)" },
        { id: 3, message: "How are You?" }
    ]
}

const dialogsReducer = (state = initialState, action) => {
    
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
export const addMessageAC = (newMessageText) => {
    return {
        type: SEND_MESSAGE,
        newMessageText
    }
}


export default dialogsReducer