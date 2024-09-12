import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export default store = configureStore({
    reducer: rootReducer,
    applyMiddleware: applyMiddleware(thunk), 
})