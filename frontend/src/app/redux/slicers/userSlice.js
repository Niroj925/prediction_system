'use client'
import { createSlice } from "@reduxjs/toolkit"
import { setActiveCustomer } from "./adminSlice";


const initialState={
  strokeValue:null,
  isLogged:false,
  doctorId:null
}

export const userSlice=createSlice({
    name:'stroke',
    initialState,
    reducers:{
          setStrokeValue:(state,action)=>{
            state.strokeValue=action.payload
          },
          setIsLogged:(state,action)=>{
            state.isLogged=action.payload
          },
          setDoctorId:(state,action)=>{
            state.doctorId=action.payload
          }
      
    }
});

export const {setStrokeValue,setIsLogged,setDoctorId}=userSlice.actions;

export default userSlice.reducer;