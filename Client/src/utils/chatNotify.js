import { createSlice } from "@reduxjs/toolkit";

const chatNoify=createSlice({
  name:"msgUserID",
  initialState:{
    msgUserID:[]
  },
  reducers:{
    addnewUserID:(state,action)=>{
      // state.msgUserID.push(action.payload)
         if (!state.msgUserID.includes(action.payload)) {
        state.msgUserID.push(action.payload);
      }
    }
  }
})
export const{addnewUserID}=chatNoify.actions
export default chatNoify.reducer