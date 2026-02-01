import { createSlice } from "@reduxjs/toolkit";

const conectionSlice=createSlice({
  name:"matches",
  initialState:{
    matches:null
  },
  reducers:{
    getConnection:(state,action)=>{
      state.matches=action.payload;
    }
  }
});
export const{getConnection}=conectionSlice.actions;
export default conectionSlice.reducer;