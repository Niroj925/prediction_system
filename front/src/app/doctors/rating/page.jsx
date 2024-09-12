"use client"
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RatingStars from "@/component/rating/rating";
import api from "@/component/api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rating = () => {
 const [doctor,setDoctor]=useState({});
 const [star,setStar]=useState(0);
  const router = useRouter();
  const params=useSearchParams();
  const userId=params.get('id');



  useEffect(()=>{
    const getDoctor=async ()=>{
      console.log('userid:',userId)
      const response=await api.get(`/doctor/${userId}`);
      console.log(response.data);
      if(response.status==200){
      setDoctor(response.data);
      }
    }
    getDoctor();
  },[userId]);




  const handleSubmit = async() => {
    console.log(star)
    try{
    const response=await api.post(`/doctor/rate/${doctor.id}`,{rating:star});

console.log(response.data);
    if(response.status==200){
        toast.success('Thanks for rating us. ', {
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
                router.push('/');
            },3000);

    }else{
        toast.error('Unable to rate..!! ', {
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
    }
}catch(err){
    toast.error('Enable to rate..!! ', {
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
}
    
  };

  const handleRatingSelect = (rating) => {
    setStar(rating)
  
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
    
          <RatingStars onSelect={handleRatingSelect}/>
         
          <div className={styles.patientslength}>
            No. of Patient Visted: {doctor.patient}
          </div>
          <div className={styles.hospital}>
             <p>{doctor.hospital}</p>
          </div>
         
        </div>

        <div>
          <button
            onClick={() => handleSubmit()}
            className={styles.addCustomer}
          >
            Rate Now
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Rating;
