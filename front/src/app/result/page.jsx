"use client"

import React,{useState,useEffect} from 'react'
import ReactSpeedometer from "react-d3-speedometer"
import styles from './result.module.css'
import { useSearchParams} from 'next/navigation'

function page() {

  const [risk,setRisk]=useState(false);
  const searchParam = useSearchParams();
  
  const value = searchParam.get("s_value");
  console.log(value);

   useEffect(()=>{
   setRisk(value>49?true:false)
   },[value])

  return (
    <div className={styles.container}>
      <div className={styles.result}>
        <ReactSpeedometer
  maxValue={100}
  value={value}
  needleColor="blue"
  startColor="green"
  segments={20}
  endColor="red"
/>

<div className={styles.messageBox} >
  <h2 className={`${risk?styles.risk:styles.norisk}`}>{risk ? 'Risk of Stroke' : 'No Risk of Stroke'}</h2>
</div>


    </div>
    </div>
  )
}

export default page