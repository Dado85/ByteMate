import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
  name:"request",
  initialState:{
    requests:null,
  },
  reducers:{
     getRequest:(state,action)=>{
      state.requests=action.payload;
     }
  }
});
export const{getRequest}=requestSlice.actions;
export default requestSlice.reducer;
