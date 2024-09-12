"use client"

import React, { useState } from 'react'
import styles from './forgot.module.css'
import api from '@/component/api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetDialog from '@/component/diologueBox/dialogue';

function ForgotPage() {

  const [email,setEmail]=useState();
  const [open,setOpen]=useState(false);
 
  //  console.log(process.env.BACKEND_API)
    const handleClick=async()=>{

		const data={
		  "email":email,
		}

    try{
		const response=await api.post('/user/otp',data);
       console.log(response);
    if(response.status===200){
      console.log(response)
    //  router.push('/dashboard/properties');
    setOpen(true);
    }else{
      console.log("Invalid credentials.");
    //   router.push('/login')
    }
    }catch(err){
      toast.error('Email Not Found..!! ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
      console.log(err);
    }
  }

  const handleChangeEmail=(e)=>{
    setEmail(e.target.value);
  }

  return (
    <div className={styles.container}> 
    {
      open && (
         <ResetDialog isOpen={true}/>
      
      )
    }
      
      <div className={styles.formContainer}>
        <h2 className={styles.login}>Forgot Password</h2>
        <form action="" className={styles.form}>
          <input 
          type='text' 
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={handleChangeEmail}
          /> 
          <button type="button" onClick={()=>handleClick()}>Send</button>
        </form>
      </div>
      <ToastContainer/>
     </div>
  )
}

export default ForgotPage