"use client"

import React from 'react'
import Links from './links/Link'
import styles from "./navbar.module.css"
import Image from 'next/image'
import { useRouter } from 'next/navigation';

function Navbar() {

  const router=useRouter();

  const handleHome=()=>{
    router.push('/');
  }

  return (
    <div className={styles.container}>
       <div>
       <Image src='/image/logo.png' alt="" width={50} height={50} className={styles.logo} onClick={()=>{handleHome()}}/>
       </div>
      <div>
        <Links/>
      </div>
    </div>
  )
}

export default Navbar