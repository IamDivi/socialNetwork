import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./auth-reducer.tsx";
import dialogsReducer from "./dialogs-reducer.ts"
import profileReducer from "./profile-reducer.ts"
import userReducer from "./users-reducer.ts";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./app-reducer.ts";

let reducers = combineReducers({
    profileState: profileReducer,
    dialogState: dialogsReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

})

export type appStateType = ReturnType<typeof reducers>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store