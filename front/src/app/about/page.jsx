"use client"

import React, { useState } from 'react';
import styles from './about.module.css';
import api from '@/component/api/api';

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open,setOpen]=useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [response,setResponse]=useState(null);
  const [result,setResult]=useState('');
  const [probabilities,setProbabilities]=useState(null);
  
  const [property, setProperty] = useState({
    confident:"",
    sick:"",
    age:null,
    gender:"",
    practice:null,
    comfort_in_new_bike:"",
    firstly_attempt_8:"",
    controlling:"",
    previous_attempt:""
  });

  const labels = Object.keys(property); // Get the keys of the property object
  
  const handleNext = () => {
    if (currentIndex < labels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGenderChange = (value) => {
    setProperty(prevState => ({
      ...prevState,
      gender: value
    }));
  };


  const handleSubmit=async()=>{
    setIsButtonDisabled(true);
    // setClicked(true);
    try{
      
      const res=await api.get('/result',property);
    // console.log(res);
    if(res.status===200){
        const data=res.data[0];
       
         setResponse(data);
         setResult(data.predictClass);
         setProbabilities(data.probabilities);
           setOpen(true);
    }
}catch(err){
console.log(err)
}finally{
//   setClicked(false);
//   setIsButtonDisabled(false);
}
  }


  return (
    <div className={styles.container}>
      <label>{labels[currentIndex]}</label>
      <br/>
      {labels[currentIndex] === 'age' || labels[currentIndex] === 'practice' ? (
        <input
          name={labels[currentIndex]}
          type="number"
          value={property[labels[currentIndex]]}
          onChange={handleInputChange}
        />
      ) : labels[currentIndex] === 'gender' ? (
        <>
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value="male"
              checked={property.gender === 'male'}
              onChange={() => handleGenderChange('male')}
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value="female"
              checked={property.gender === 'female'}
              onChange={() => handleGenderChange('female')}
            />
          </label>
        </>
      ) : (
        <>
          <label>
            Yes
            <input
              type="radio"
              name={labels[currentIndex]}
              value="yes"
              checked={property[labels[currentIndex]] === 'yes'}
              onChange={handleInputChange}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name={labels[currentIndex]}
              value="no"
              checked={property[labels[currentIndex]] === 'no'}
              onChange={handleInputChange}
            />
          </label>
        </>
      )}
      <br/>
      <br/>
      {/* Repeat input fields as needed */}
      <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
      <button onClick={handleNext} disabled={currentIndex === labels.length - 1}>Next</button>
      <br/>
      {currentIndex === labels.length - 1 && (
        <button 
        onClick={handleSubmit}
        disabled={isButtonDisabled} 
        >Submit</button>
      )}
      <br/>

      {
        open?(
            <>
            <h2>Result:{result}</h2> 
           <p>{probabilities}</p>
            </>
           
        ):(
            <>
            </>
        )
      }
      
    </div>
  );
};

export default Slide;
