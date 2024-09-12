"use client"

import React, { useState, useEffect } from 'react'
import styles from './add.module.css'
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/component/api/api';
import { useSelector } from 'react-redux';
import useApi from '@/component/customeHook/fetch';
import { method } from '@/component/api/apimethod';
import { bookAppoint } from '@/component/api/endpoint';


function Book() {
  const stroke = useSelector((state) => state.stroke.strokeValue);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isBook, setIsBook] = useState(false);
  const [patient, setpatient] = useState({
    name: '',
    contact: null,
    email: "",
    stroke
  });
  const searchParam = useSearchParams();
  const doctorId = searchParam.get('id');
  const { data, isLoading, hasError, errorMessage } = useApi(bookAppoint(doctorId), method.post, patient, isBook);
 const router=useRouter();

 useEffect(() => {
  if (data) {
    toast.success('Appointment has been successfully placed', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      router.push('/');
    }, 3000);
    
    // Reset patient details
    setpatient({
      name: '',
      contact: 977,
      email: "",
      stroke: null
    });
  }

  if (hasError) {
    toast.error(errorMessage || 'Something went wrong!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      router.push('/');
    }, 3000);

    setIsButtonDisabled(false);
  }
}, [data, hasError, router, errorMessage]);


  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setpatient((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setIsButtonDisabled(true);
    patient.contact = parseInt(patient.contact),
      patient.stroke = stroke,
      setIsBook(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.login}>Book Now</h2>
        <hr className={styles.line} />
        <form action="" className={styles.form}>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={patient.name}
            onChange={handleChange}
            required
          />
          <input
            type='number'
            placeholder='Mobile Number'
            name='contact'
            value={patient.contact}
            onChange={handleChange}
            onWheel={(e) => e.preventDefault()}
            required
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={patient.email}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleClick()} disabled={isButtonDisabled}>Confirm </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Book