import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import { combineReducers,compose } from "redux";
import UserAuthenticate from "./slice/userAuthincateSlice";
import reduxLogger from "redux-logger";
import { LocalStorageGet} from "./common/localStorage/localStorageHelper";
const reducer = combineReducers({  User: UserAuthenticate });
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [...getDefaultMiddleware()];
if (process.env.NODE_ENV !== "production") {
    middleware.push(reduxLogger);
}
const USER_INFO_LOCAL_STORAGE_KEY ='token';
const initialState = {
    User: {
        userAccount: localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY)? JSON.parse(LocalStorageGet(USER_INFO_LOCAL_STORAGE_KEY)): null,
        isLoading: false,
        isAuthenticated: localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY)?true:false,
        errors: []
    },
};

const store = configureStore({
    reducer,
    preloadedState:initialState,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
});

export default store;