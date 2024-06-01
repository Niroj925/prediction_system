'use client'
import { createSlice } from "@reduxjs/toolkit"


const initialState={
  accessToken:null,
}

export const tokenSlice=createSlice({
    name:'token',
    initialState,
    reducers:{
          setAccessToken:(state,action)=>{
            state.accessToken=action.payload
          },
      
    }
});

export const {setAccessToken}=tokenSlice.actions;

export default tokenSlice.reducer;