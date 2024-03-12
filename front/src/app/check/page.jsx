"use client";

import React, { useState } from "react";
import styles from "./check.module.css";
import api from "@/component/api/api";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setStrokeValue } from "@/app/redux/slicers/userSlice";

const Check = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [response, setResponse] = useState(null);
  const [result, setResult] = useState("");
  const [probabilities, setProbabilities] = useState(null);

  const router = useRouter();
  const dispatch=useDispatch();

  const [property, setProperty] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",
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
    setProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleWorkChange = (e) => {
    setProperty((prevState) => ({
      ...prevState,
      work_type: e.target.value,
    }));
  };

  const handleSmokeChange = (e) => {
    // console.log(e.target.value);
    setProperty((prevState) => ({
      ...prevState,
      smoking_status: e.target.value,
    }));
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setProperty((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  const handleResidenceChange = (e) => {
    const { value } = e.target;
    setProperty((prevState) => ({
      ...prevState,
      residence_type: value,
    }));
  };

  const handleSubmit = async () => {
    setIsButtonDisabled(true);
    property.hypertension = property.hypertension === "yes" ? "1" : "0";
    property.heart_disease = property.heart_disease === "yes" ? "1" : "0";

    //  console.log(property);
    // setClicked(true);
    try {
      const res = await api.post("/predict/result", property);
      console.log(res.data[0]);
      if (res.status === 200) {
        const data = res.data[0];
        dispatch(setStrokeValue(data.probabilities.stroke))
        setResponse(data);
        setResult(data.predictClass);
        setProbabilities(data.probabilities);
        router.push(`/result?s_value=${data.probabilities.stroke}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      //   setClicked(false);
      //   setIsButtonDisabled(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputBox}>
        <div className={styles.heading}>
          <h3>Select Options</h3>
        </div>
        <hr/>
        <div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel}>{labels[currentIndex]}</label>
            {labels[currentIndex] === "age" ||
            labels[currentIndex] === "avg_glucose_level" ||
            labels[currentIndex] === "bmi" ? (
              <input
                name={labels[currentIndex]}
                type="number"
                value={property[labels[currentIndex]]}
                onChange={handleInputChange}
                placeholder="Enter value..."
              />
            ) : labels[currentIndex] === "work_type" ||
              labels[currentIndex] === "smoking_status" ? (
              <>
                {labels[currentIndex] === "work_type" ? (
                  <div className={styles.radio}>
                    <label>
                      <input
                        type="radio"
                        name="work_type"
                        value="private"
                        checked={property.work_type === "private"}
                        onChange={handleWorkChange}
                      />
                      <span>Private</span>
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="work_type"
                        value="self_employed"
                        checked={property.work_type === "self_employed"}
                        onChange={handleWorkChange}
                      />
                      <span>Self Employed</span>
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="work_type"
                        value="gov_job"
                        checked={property.work_type === "gov_job"}
                        onChange={handleWorkChange}
                      />
                      <span>Government Job</span>
                    </label>
                  </div>
                ) : (
                  <div className={styles.radio}>
                    <label>
                      <input
                        type="radio"
                        name="smoking_status"
                        value="smokes"
                        checked={property.smoking_status === "smokes"}
                        onChange={handleSmokeChange}
                      />
                      <span>Smokes</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="smoking_status"
                        value="formerly smoked"
                        checked={property.smoking_status === "formerly smoked"}
                        onChange={handleSmokeChange}
                      />
                      <span>Formerly Smoked</span>
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="smoking_status"
                        value="never smoked"
                        checked={property.smoking_status === "never smoked"}
                        onChange={handleSmokeChange}
                      />
                      <span>Never Smoked</span>
                    </label>
                  </div>
                )}
              </>
            ) : labels[currentIndex] === "gender" ? (
              <div className={styles.radio}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={property.gender === "male"}
                    onChange={handleGenderChange}
                  />
                  <span>Male</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={property.gender === "female"}
                    onChange={handleGenderChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            ) : labels[currentIndex] === "residence_type" ? (
              <div className={styles.radio}>
                <label>
                  <input
                    type="radio"
                    name="residence_type"
                    value="urban"
                    checked={property.residence_type === "urban"}
                    onChange={handleResidenceChange}
                  />
                  <span>Urban</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="residence_type"
                    value="rural"
                    checked={property.residence_type === "rural"}
                    onChange={handleResidenceChange}
                  />
                  <span>Rural</span>
                </label>
              </div>
            ) : (
              <div className={styles.radio}>
                <label>
                  <input
                    type="radio"
                    name={labels[currentIndex]}
                    value="yes"
                    checked={property[labels[currentIndex]] === "yes"}
                    onChange={handleInputChange}
                  />
                  <span>Yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name={labels[currentIndex]}
                    value="no"
                    checked={property[labels[currentIndex]] === "no"}
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={styles.button}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === labels.length - 1}
            className={styles.button}
          >
            Next
          </button>
        </div>

        <div className={styles.submit}>
          {currentIndex === labels.length - 1 && (
            <button
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              className={styles.button}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div className={styles.bmi}>
         {
  currentIndex == 8 &&(
    <a href="http://nirajanthapa.com.np/" target="_blank">Check BMI</a>
  )
 }
      </div>

    </div>
  );
};

export default Check;