"use client";

import React, { useState, useEffect } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import styles from './result.module.css';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setStrokeValue } from '../redux/slicers/userSlice';

function ResultPage() {  

  const [risk, setRisk] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const searchParam = useSearchParams();
  const value = parseFloat(searchParam.get("s_value"));
  console.log(value);

  useEffect(() => {
    dispatch(setStrokeValue(value));
    setRisk(value > 49 ? true : false);
  }, [value, dispatch]);  // Added 'dispatch' to the dependency array

  const handleClick = () => {
    router.push('/doctors');
  };

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
        <div className={styles.messageBox}>
          <h2 className={`${risk ? styles.risk : styles.norisk}`}>
            {risk ? 'Risk of Stroke' : 'No Risk of Stroke'}
          </h2>
        </div>
        <div>
          {risk && (
            <button onClick={handleClick} className={styles.checkbtn}>
              Check Up Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;  // Export component with an uppercase name
