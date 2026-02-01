import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
  name:"user",
  initialState:{
     user: null,
    isUserLoggedIn: false,
    authMode:"login"
  },
  reducers:{
    setAuthMode:(state,action)=>{
       state.authMode=action.payload;
    },
    addUser:(state,action)=>{
        state.user=action.payload,
        state.isUserLoggedIn=true
},
    removeUser:(state)=>{
       state.user = null;
      state.isUserLoggedIn = false;
    }
  }
});
export const{addUser,removeUser,setAuthMode}=userSlice.actions;
export default userSlice.reducer;