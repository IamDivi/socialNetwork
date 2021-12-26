import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"
import userReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profileState: profileReducer,
    dialogState: dialogsReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store