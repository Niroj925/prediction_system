import styles from "./properties.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import RatedStars from "../rating/ratedStar";
import api from "../api/api";

const AllDoctors = ({ doctor }) => {

  const [patients,setPatients]=useState([]);

  const router = useRouter();


  const getPatient=async()=>{
    try{
     const res=await api.get(`/patient/${doctor.id}`);
    if(res.status==200){
      setPatients(res.data);
    }
    }catch(err){
      console.log(err)
    }
  }
  const rating = () => {
    let total = 0;
    const ratings = doctor.ratings;

    for (const rate of ratings) {
      total += rate;
    }

    const rating = total / ratings.length;


    return rating.toFixed(1);
  };


  useEffect(() => {
    getPatient();

  }, [doctor.ratings]);

  const handleOrderClick = () => {
    router.push(`/doctors/book?id=${doctor.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/image/doct.jpg"
          alt=""
          className={styles.img}
          width={165}
          height={165}
        />
      </div>

      <div className={styles.bottom}>
        <div className={styles.productInfo}>
          <div className={styles.name}>
             <h3>{doctor.name}</h3>
          </div>
         {
          doctor.ratings.length>0&&(
             <div className={styles.rating}>
            <RatedStars totalStars={rating()}/>
            <span>{rating()}</span>
          </div>
          )
         }
         
          <div className={styles.patientslength}>
            No. of Patient Visted: {patients.length}
          </div>
          <div className={styles.hospital}>
             <p>{doctor.hospital}</p>
          </div>
         
        </div>

        <div>
          <button
            onClick={() => handleOrderClick()}
            className={styles.addCustomer}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;