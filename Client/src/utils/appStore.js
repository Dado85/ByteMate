import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
import msgUserReducer from "./chatNotify"
const appStore=configureStore({
 reducer:{
   user:userReducer,
   feed:feedReducer,
   matches:connectionReducer,
   request:requestReducer,
   msgUserID:msgUserReducer
 }
})
export default appStore;