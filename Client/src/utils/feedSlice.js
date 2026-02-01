import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
  name:"feed",
  initialState:{
    feed:[],
  },
  reducers:{
    addFeed:(state,action)=>{
        state.feed=action.payload;
    },
    removeFeed:(state,action)=>{
         const newFeed=state.feed.filter((user)=>user?._id!==action.payload);
         state.feed=newFeed;
    }
  }
});
export const{addFeed,removeFeed}=feedSlice.actions;
export default feedSlice.reducer;