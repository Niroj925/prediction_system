"use client"

import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import styles from './dialogue.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';

export default function ResetBox({isOpen}) {
  console.log(isOpen);
  const [open, setOpen] = useState(isOpen);
  const [password,setPassword]=useState();
  const [cPassword,setCPassword]=useState();
  const [otp,setOtp]=useState();

  const router=useRouter();

  const handleClose = () => {
    setOpen(false);
    router.push('/admin/login');
  };

  const handleClick=async()=>{

    const data={
		  "password":password,
      "otp":parseInt(otp)
		}

  if(password===cPassword){
    try{
    
		const response=await api.post('/admin/password/reset',data);
    if(response.status===200){
      setOpen(false);
      toast.success('Password has been Changed', {
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
        setTimeout(()=>{
          router.push('/admin/login')
        },3000);
    }else{
      
      setOpen(false);
      
      router.push('/admin/resetpass')
    }
    }catch(err){
      toast.error('Invalid OTP.Try Again', {
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

        setTimeout(()=>{
          router.push('/admin/login')
        },3000)
      
      setOpen(false);
      console.log(err);
    }
  }else{
    toast.info('Confirm password does not match', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }


  }
  const handleChangePassword=(e)=>{
    setPassword(e.target.value);
  }

  const handleChangeCPassword=(e)=>{
    setCPassword(e.target.value);
  }

  const handleChangeOtp=(e)=>{
    setOtp(e.target.value);
  }


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        className={styles.dialogue}
      >
        
        <div className={styles.close}>
          <CloseIcon type="button" onClick={()=>handleClose()} />
        </div>
        <div className={styles.container}>
        <div className={styles.msg}>
          <p className={styles.text}>Otp has been sent to your register email.</p>
        </div>
             
                <div className={styles.formContainer}>
                  <h2 className={styles.login}>Change Password</h2>
                  <form action="" className={styles.form}>
                  <input 
                      type='text' 
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={handleChangePassword}
                      /> 
                      <input 
                      type='text'
                      placeholder='confirm password'
                      name='cpassword'
                      value={cPassword}
                      onChange={handleChangeCPassword}
                      />
                      <input 
                      type='number'
                      placeholder='Enter OTP'
                      name='Otp'
                      value={otp}
                      onChange={handleChangeOtp}
                      />
                     <button type="button" onClick={()=>handleClick()}>Change Password</button>
        
                  </form>
                </div>
                </div>
      </Dialog>
      <ToastContainer/>
    </>
  );
}