'use client'
import { createSlice } from "@reduxjs/toolkit"

const initialState={
  isLogged:false,
  isDropDownOpen:false,
  myProperties:[],
  myCustomers:[],
  myOrders:[],
  activeCustomer:null
}

export const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        setProperties:(state,action)=>{
             state.myProperties=action.payload;
        },

        setMyCustomer:(state,action)=>{
          state.myCustomers=action.payload;
          },

          setActiveCustomer:(state,action)=>{
          state.activeCustomer=action.payload;
          },

          setMyOrders:(state,action)=>{
            state.myOrders=action.payload
          },
        
        login:(state)=>{
          state.isLogged=true;
        },
        logout: (state) => {
            state.isLogged=false;
            state.myProperties=[];
            state.myCustomers=[];
          },
        ddOpen:(state,action)=>{
         state.isDropDownOpen= action.payload;
        }
    }
});

export const {setProperties,setMyCustomer,setActiveCustomer,setMyOrders, login,logout,ddOpen}=adminSlice.actions;

export default adminSlice.reducer;