
"use client"

import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const Home = () => {

const router=useRouter();

const handleProperties=()=>{
  router.push('/check');
}

  return(
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.heading}>
      <h2 className={styles.title}>Safeguarding Your Health: Advanced Stroke Prediction System</h2>
      </div>
      <div className={styles.imageContainerMobile}>
      <Image src='/image/home.png' alt='img' height={450} width={500} className={styles.heroImage}/>   
      </div>
      <p className={styles.desc}>
        The Advanced Stroke Prediction System utilizes AI to assess stroke 
        risk by analyzing health data. It offers personalized risk assessments, 
        empowering users to take preventive actions and seek timely medical help, 
        ultimately reducing stroke incidence and severity. With intuitive interfaces, 
        it seamlessly integrates into healthcare workflows for informed decision-making 
        and improved patient outcomes.
       </p> 

        <div className={styles.buttons}>
            <button className={styles.button} onClick={()=>handleProperties()}>Check Now</button>
        </div>
      </div>

      <div className={styles.imageContainer}>
      <Image src='/image/home.png' alt='img' height={450} width={500} className={styles.heroImage}/>   
      </div>
    </div>
  );
   
};

export default Home;